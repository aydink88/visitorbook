const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/error-response");

const getUsers = async (req, res, next) => {
  console.log(req.cookies);
  let users;
  try {
    users = await UserModel.find();
  } catch (err) {
    return next(err);
  }
  res.status(200).json({ users: users });
};

const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await UserModel.findById(req.params.uid).select("-password");
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return next(new ErrorResponse("No user matches this Id", 400));
  }
  res.status(200).json({ user: user });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Inputs do not meet requirements", 422));
  }

  const { username, email, password } = req.body;

  let existingEmail, existingUsername;
  try {
    existingEmail = await UserModel.findOne({ email: email });
    existingUsername = await UserModel.findOne({ username: username });
  } catch (err) {
    return next(err);
  }

  if (existingEmail || existingUsername) {
    return next(new ErrorResponse("User already exists", 422));
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const createdUser = new UserModel({
    username,
    email,
    password: hashedPassword,
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

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Inputs do not meet requirements", 422));
  }

  try {
    const user = await UserModel.findByIdAndUpdate(req.params.uid, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.uid);
    res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
