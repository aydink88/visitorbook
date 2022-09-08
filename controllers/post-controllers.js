const PostModel = require("../models/post-model");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/error-response");

const getPosts = async (_req, res, next) => {
  let posts;
  try {
    posts = await PostModel.find();
  } catch (err) {
    return next(err);
  }
  res.status(200).json({ posts: posts });
};

const getPostById = async (req, res, next) => {
  let post;
  try {
    post = await PostModel.findById(req.params.pid).populate("user");
  } catch (err) {
    return next(err);
  }
  if (!post) {
    return next(new ErrorResponse("Post does not exist anymore", 401));
  }
  res.status(200).json({ post: post });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ErrorResponse("Inputs do not meet requirements", 422));
  }

  console.log(req.body.title);

  // if (req.file === undefined) {
  //   req.file = {};
  //   req.file.path = "uploads/images/default.png";
  // }

  const createdPost = new PostModel({
    user: req.userData.userId,
    title: req.body.title,
    image: req.file === undefined ? req.body.image : req.file.path,
    text: req.body.text,
    likes: req.body.likes,
    comments: req.body.comments,
  });

  let post;
  try {
    post = await createdPost.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ success: true, post: post });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Inputs do not meet requirements", 422));
  }

  let post;
  try {
    post = await PostModel.findByIdAndUpdate(req.params.pid, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({ post: post });
};

const deletePost = async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.pid);
    res.status(200).json({ post });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
