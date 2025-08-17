const express = require("express");
const config = require("../config");
const router = express.Router();

router.use("/user", require("./user"));

router.use("/auth", require("./auth"));

router.use("/dashboard", require("./dashboard"));

router.use("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.all(/.*/, (req, res, next) => {
  try {
    let err = new Error("This page can not be found");
    err.status = 404;
    throw err;
  } catch (err) {
    next(err);
  }
});

router.use(async (err, req, res, next) => {
  const code = err.status || 500;
  const message = err.message;
  const stack = err.stack;
  if (config.debug) {
    return res.status(code).render("errors/developer", { message, stack });
  } else {
    // Use specific template if it exists (404), otherwise use 500
    const templateName = code === 404 ? "404" : "500";
    return res.status(code).render(`errors/${templateName}`, { message });
  }
});
module.exports = router;
