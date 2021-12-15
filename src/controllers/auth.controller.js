import { User } from "../models";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import { userSchema } from "../libs/schema.validator";
import createError from "http-errors";
import { signAccessToken  } from '../helpers/signAccessToken'

export const login = async (req, res, next) => {
    try {
        const result = await userSchema.validateAsync(req.body);

        const user = new User({ email: result.email, password: result.password });
      
        /* Match password */
      
        const userFound = await User.findOne({ email: user.email });
        if (!userFound) throw createError.Unauthorized("User not found")
       
      
        const isMatch = await userFound.validPassword(user.password);
      
        if (!isMatch) throw createError.Unauthorized("Invalid password")

        const token = await signAccessToken(userFound.id)

        res.json({token})

    } catch (error) {
        if (error.isJoi) error.status = 400 
        next(error)
    }
};

export const register = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);

    const user = new User({ email: result.email, password: result.password });
    user.password = await user.generateHash(user.password);

    const userFound = await User.findOne({ email: user.email });
    if (userFound) throw createError.Conflict("User already exists");

    const newUser = await user.save();

    const token = await signAccessToken(newUser.id)

    res.json({token})

  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const profile = async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId }).select("-password");

  if (!user) return next(createError.NotFound("User not found"));

  res.json(user);
};
