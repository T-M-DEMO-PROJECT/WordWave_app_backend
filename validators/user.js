import Joi from "joi";

export const addRegisterValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({ 'any.only': 'Passwords do not match' })
});

export const addLoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});