const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require("../middleware/auth");

// Do work here
router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);
router.get("/api/users/logout", auth, userController.logout);
router.get("/api/users", auth, userController.users);

module.exports = router;
