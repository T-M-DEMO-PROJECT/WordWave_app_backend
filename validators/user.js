import Joi from "joi";
import { author } from "../middlewares/auth.js";

export const addRegisterValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    author: Joi.boolean().optional() // Optional for registration
});

export const addLoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    author: Joi.boolean().forbidden().messages({ "any.forbidden": "You cannot set admin during registration" }), // Allow admin to set this during profile updates
});