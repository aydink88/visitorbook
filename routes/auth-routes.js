const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

const userValidator = [
  check("username").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({
    min: 6,
  }),
];

router.route("/login").post(authControllers.login);
router
  .route("/register")
  .post(fileUpload.single("avatar"), userValidator, authControllers.register);
router.route("/verify-token").get(checkAuth, authControllers.verifyToken);
router.get("/logout", authControllers.logout);

module.exports = router;
