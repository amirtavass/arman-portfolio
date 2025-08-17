const { validationResult } = require("express-validator");
let controller = require("./controller");
const User = require("../models/user");

module.exports = new (class DashboardController extends controller {
  async index(req, res, next) {
    try {
      res.render("dashboard/index");
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
