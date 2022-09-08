const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile-controllers");
const checkAuth = require("../middleware/check-auth");

// /api/v1/profile
router.route("/me").get(checkAuth, profileController.myProfile);
router
  .route("/:uid")
  .get(profileController.getProfile)
  .patch(checkAuth, profileController.updateProfile)
  .delete(checkAuth, profileController.deleteProfile);
router.route("/").post(checkAuth, profileController.createProfile);

module.exports = router;
