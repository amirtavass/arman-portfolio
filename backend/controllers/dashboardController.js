const { validationResult } = require("express-validator");
let controller = require("./controller");
const User = require("../models/user");
const axios = require("axios");
const payment = require("../models/payment");

module.exports = new (class DashboardController extends controller {
  async index(req, res, next) {
    try {
      res.render("dashboard/index");
    } catch (err) {
      next(err);
    }
  }
  async pay(req, res, next) {
    try {
      let params = {
        merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        amount: req.body.amount,
        callback_url: "http://localhost:4000/paycallback",
        description: "charging balance",
      };
      const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/request.json",
        params
      );
      console.log(response);
      if (response.data.status == 100) {
        let newPayment = new payment({
          user: req.user.id,
          amount: req.body.amount,
          resnumber: response.data.authority,
        });
        await newPayment.save();
        res.redirect(
          `https://www.zarinpal.com/pg/StartPay/${response.data.authority}`
        );
      }
    } catch (err) {
      next(err);
    }
  }
  async edituser(req, res, next) {
    try {
      // Debug logs
      console.log("req.body:", req.body);
      console.log("req.file:", req.file);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/dashboard");
      }

      let data = {
        name: req.body.name,
      };

      if (req.file) {
        data.img = req.file.path.replace(/\\/g, "/").substring(6);
        console.log("Image path set:", data.img);
      }

      console.log("Update data:", data);
      console.log("User ID:", req.body.id);

      const result = await User.updateOne({ _id: req.body.id }, { $set: data });
      console.log("Update result:", result);

      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error in edituser:", err);
      next(err);
    }
  }
})();
