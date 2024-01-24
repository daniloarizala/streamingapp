import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";
import { postLogin, postRegister } from "../controllers/controllers.js";

const router = express.Router();

const validator = ExpressValidation.createValidator({});

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(20).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(20).required(),
    email: Joi.string().email().required(),
});

router.post("/register", validator.body(registerSchema), postRegister);

router.post("/login", validator.body(loginSchema), postLogin);


export default router;