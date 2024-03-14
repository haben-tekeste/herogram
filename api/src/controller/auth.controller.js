import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";
import { User } from '../model/user.js';

export const userSignUp = async (req, res, next) => {
  const errors = validationResult(req); // errors in server side validation
  console.log(errors.isEmpty())
  if (!errors.isEmpty()) {
    
    const error = new Error("Email and Password should not be empty");
    error.statusCode = 422;
    error.data = errors.array()[0];
    return next(error);
  }
  try {
    const {email, password} = req.body
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Sorry but the email is already taken");
    }
    const newUser = new User({email, password });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id },
      `${process.env.MY_SECRET_WEB_TOKEN_KEY}`
    );
    res.send({ success: true, token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userSignIn = async (req, res, next) => {
    const errors = validationResult(req); // errors in server side validation
    if (!errors.isEmpty()) {
      
      const error = new Error("Email and Password should not be empty");
      error.statusCode = 422;
      error.data = errors.array()[0];
      return next(error);
    }
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Sorry invalid email or password");
    }
    const match = await user.comparePassword(password);
    if (!match) {
      throw new Error("Sorry invalid email or password");
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.MY_SECRET_WEB_TOKEN_KEY.toString()
    );
    res.send({ success: true, token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
