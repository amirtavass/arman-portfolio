const { validationResult } = require("express-validator");
let User = require("models/user");
let controller = require("./controller");
const payment = require("../models/payment");
const axios = require("axios");

class UserController extends controller {
  async paycallback(req, res, next) {
    try {
      if (req.query.Status && req.query.Status !== "OK") {
        return res.send("تراکنش ناموفق");
      }
      let paymentRecord = await payment.findOne({
        resnumber: req.query.Authority,
      });
      if (!paymentRecord) {
        return res.send("همچنین تراکنشی وجود ندارد");
      }
      let params = {
        merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        amount: paymentRecord.amount,
        authority: req.query.Authority,
      };
      const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/verify.json",
        params
      );
      if (response.data.status == 100) {
        let balance = paymentRecord.amount;
        let user = await User.findById(paymentRecord.user);
        if (user.balance) {
          balance += user.balance;
        }
        user.balance = balance;
        paymentRecord.payment = true;
        await user.save();
        await paymentRecord.save();
        res.redirect("/dashboard");
      } else {
        return res.send("تراکنش ناموفق");
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
