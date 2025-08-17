const { check } = require("express-validator");
const validator = require("./validator");

module.exports = new (class UserValidator extends validator {
  login() {
    return [
      check("name", "name can't be empty").not().isEmpty(),
      check("password", "password length must at least 5").isLength({ min: 5 }),
    ];
  }
  register() {
    return [
      check("name", "name can't be empty").not().isEmpty(),
      check("password", "password length must at least 5").isLength({ min: 5 }),
    ];
  }
})();
