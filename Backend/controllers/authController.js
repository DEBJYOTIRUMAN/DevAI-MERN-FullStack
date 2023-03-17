import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const authController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      firstName: Joi.string()
        .pattern(new RegExp("^[a-zA-Z ]{2,20}$"))
        .required(),
      lastName: Joi.string()
        .pattern(new RegExp("^[a-zA-Z ]{2,20}$"))
        .required(),
      phone: Joi.string().pattern(new RegExp("^[0-9]{10,15}$")).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    const { firstName, lastName, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    try {
      const result = await user.save();
      res.json(result);
    } catch (err) {
      return next(err);
    }
  },

  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
export default authController;
