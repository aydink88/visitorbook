const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const postControllers = require("../controllers/post-controllers");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

const postValidator = [
  check("title", "Title is required").not().isEmpty(),
  check("text", "Please include content (at least 10 characters).").isLength({
    min: 10,
  }),
];

router
  .route("/")
  .get(postControllers.getPosts)
  .post(
    checkAuth,
    fileUpload.single("image"),
    postValidator,
    postControllers.createPost
  );
router
  .route("/:pid")
  .get(postControllers.getPostById)
  .patch(checkAuth, postValidator, postControllers.updatePost)
  .delete(checkAuth, postControllers.deletePost);

module.exports = router;
