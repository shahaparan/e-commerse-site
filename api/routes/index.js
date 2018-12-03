const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const brandController = require("../controllers/brandController");
const woodController = require("../controllers/woodController");

const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

// Do work here
router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);
router.get("/api/users/logout", auth, userController.logout);
router.get("/api/users", auth, userController.users);

//add product
router.post("/api/product/article", auth, admin, productController.addProduct);
router.get("/api/product/article_sort_by", productController.getProductSortBy);
router.get("/api/product/articles_by_id", productController.getProductArticle);
router.get("/api/product", productController.getallProduct);

//  brand
router.post("/api/product/brands", auth, admin, brandController.addBrand);
router.get("/api/product/brands", brandController.getBrand);

//  wood
router.post("/api/product/woods", auth, admin, woodController.Addwood);
router.get("/api/product/woods", woodController.getwood);

module.exports = router;
