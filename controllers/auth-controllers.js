const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/error-response");
const asyncUtil = require("../middleware/async-util");

// api/v1/auth/login , return token to user, public route
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Invalid inputs", 401));
  }
  const existingUser = await UserModel.findOne({ email: email });
  if (!existingUser) {
    return next(new ErrorResponse("Email or password wrong", 403));
  }

  const isValidPassword = await bcrypt.compare(password.toString(), existingUser.password);

  if (!isValidPassword) {
    return next(new ErrorResponse("Email or password wrong", 403));
  }

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const cookieOptions = { httpOnly: true, maxAge: 3600 * 1000, secure: true };

  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};

// api/v1/auth/register , save user to db, return token to user, public route
const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ErrorResponse("Inputs do not meet requirements", 422));
  }

  const { username, email, password } = req.body;

  let existingEmail;
  try {
    existingEmail = await UserModel.findOne({ email: email });
  } catch (err) {
    return next(err);
  }

  if (existingEmail) {
    return next(new ErrorResponse("User already exists", 422));
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  let avatarImage;
  if (req.file === undefined) {
    avatarImage = "uploads/images/avatar.png";
  } else {
    avatarImage = req.file.path;
  }

  const createdUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    avatar: avatarImage,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(err);
  }

  const token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    date: createdUser.date,
    token: token,
  });
};

const verifyToken = (req, res, next) => {
  if (req.userData?.userId) {
    return res.status(200).json({
      success: true,
      userId: req.userData?.userId,
    });
  } else {
    next(new ErrorResponse("Authentication failed.", 401));
  }
};

module.exports = {
  login: asyncUtil(login),
  register: asyncUtil(register),
  verifyToken: asyncUtil(verifyToken),
};
