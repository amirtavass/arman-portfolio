const express = require("express");
const router = express.Router();

// Controllers
const productController = require("../controllers/productController");

// Validators
const productValidator = require("../validators/productValidator");

// Middleware for admin-only routes
const adminOnly = (req, res, next) => {
  if (req.session.isAdmin && req.session.adminId) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Admin access required.",
  });
};
// Public routes (no authentication required)
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);

// Admin-only routes
router.post(
  "/",
  adminOnly,
  productValidator.handle(),
  productController.createProduct
);
router.put(
  "/:id",
  adminOnly,
  productValidator.handle(),
  productController.updateProduct
);
router.delete("/:id", adminOnly, productController.deleteProduct);

module.exports = router;
