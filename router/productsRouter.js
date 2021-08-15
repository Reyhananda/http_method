const express = require("express");

// Import file controllernya
const { productsController } = require("../controller");

// Mengakses Route yang disiapkan oleh Express
const router = express.Router();

// Export berupa object maka digunakan .getProducts
router.get("/products", productsController.getProducts);
router.post("/products", productsController.postProducts);

// Lalu Export Routernya ke Index.js
module.exports = router;
