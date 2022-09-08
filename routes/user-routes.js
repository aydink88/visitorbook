const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userControllers = require("../controllers/user-controllers");
const checkAuth = require("../middleware/check-auth");

const userValidator = [
  check("username", "username is required").not().isEmpty(),
  check("email", "Please include a valid email").normalizeEmail().isEmail(),
  check("password", "Password should be at least 6 characters").isLength({
    min: 6,
  }),
];

router
  .route("/")
  .get(userControllers.getUsers)
  .post(userValidator, userControllers.createUser);

router
  .route("/:uid")
  .get(userControllers.getUserById)
  .patch(checkAuth, userValidator, userControllers.updateUser)
  .delete(checkAuth, userControllers.deleteUser);

module.exports = router;
