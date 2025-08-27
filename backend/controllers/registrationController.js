const { validationResult } = require("express-validator");
const Registration = require("../models/registration");
const Class = require("../models/class");
const User = require("../models/user");
const payment = require("../models/payment");
const axios = require("axios");
let controller = require("./controller");

class RegistrationController extends controller {
  // POST /registrations - Register for a class
  async registerForClass(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map((err) => err.msg),
          message: "Validation failed",
        });
      }

      const { classId } = req.body;
      const userId = req.user ? req.user.id : "507f1f77bcf86cd799439012"; // Test user ID

      // Check if class exists and is available
      const classItem = await Class.findById(classId);
      if (!classItem) {
        return res.status(404).json({
          success: false,
          message: "Class not found",
        });
      }

      // Check if class is full
      if (classItem.currentStudents >= classItem.maxStudents) {
        return res.status(400).json({
          success: false,
          message: "Class is full",
        });
      }

      // Check if user already registered
      const existingRegistration = await Registration.findOne({
        student: userId,
        class: classId,
      });

      if (existingRegistration) {
        return res.status(400).json({
          success: false,
          message: "Already registered for this class",
        });
      }

      // For free classes (trial sessions), register directly
      if (classItem.price === 0) {
        const newRegistration = new Registration({
          student: userId,
          class: classId,
          paymentAmount: 0,
          paymentStatus: "paid",
          status: "registered",
        });

        await newRegistration.save();

        // Update class current students count
        await Class.findByIdAndUpdate(classId, {
          $inc: { currentStudents: 1 },
        });

        return res.status(201).json({
          success: true,
          data: newRegistration,
          message: "Successfully registered for free class",
        });
      }

      // For paid classes, initiate payment
      let params = {
        merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        amount: classItem.price,
        callback_url: "http://localhost:4000/registrations/payment-callback",
        description: `Registration for ${classItem.title}`,
      };

      const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/request.json",
        params
      );

      if (response.data.status == 100) {
        // Create registration with pending payment
        const newRegistration = new Registration({
          student: userId,
          class: classId,
          paymentAmount: classItem.price,
          paymentReference: response.data.authority,
          paymentStatus: "pending",
          status: "registered",
        });

        await newRegistration.save();

        // Also create payment record for tracking
        let newPayment = new payment({
          user: userId,
          amount: classItem.price,
          resnumber: response.data.authority,
        });
        await newPayment.save();

        return res.json({
          success: true,
          paymentUrl: `https://www.zarinpal.com/pg/StartPay/${response.data.authority}`,
          message: "Payment initiated. Redirecting to payment gateway.",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Payment initiation failed",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // GET /registrations/payment-callback - Handle payment callback
  async paymentCallback(req, res, next) {
    try {
      if (req.query.Status && req.query.Status !== "OK") {
        return res.redirect("/dashboard?payment=failed");
      }

      const registration = await Registration.findOne({
        paymentReference: req.query.Authority,
      });

      if (!registration) {
        return res.redirect("/dashboard?payment=notfound");
      }

      let params = {
        merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        amount: registration.paymentAmount,
        authority: req.query.Authority,
      };

      const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/verify.json",
        params
      );

      if (response.data.status == 100) {
        // Update registration payment status
        registration.paymentStatus = "paid";
        await registration.save();

        // Update payment record
        const paymentRecord = await payment.findOne({
          resnumber: req.query.Authority,
        });
        if (paymentRecord) {
          paymentRecord.payment = true;
          await paymentRecord.save();
        }

        // Update class current students count
        await Class.findByIdAndUpdate(registration.class, {
          $inc: { currentStudents: 1 },
        });

        res.redirect("/dashboard?payment=success");
      } else {
        // Payment failed, update status
        registration.paymentStatus = "failed";
        await registration.save();

        res.redirect("/dashboard?payment=failed");
      }
    } catch (err) {
      next(err);
    }
  }

  // GET /registrations/my - Get user's registrations
  async getMyRegistrations(req, res, next) {
    try {
      const registrations = await Registration.find({
        student: req.user ? req.user.id : "507f1f77bcf86cd799439012",
      })
        .populate("class", "title date time classType instructor location")
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: registrations,
        message: "Registrations retrieved successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RegistrationController();
