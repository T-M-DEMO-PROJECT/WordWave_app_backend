import Joi from "joi";

export const addAudiobookValidator = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title cannot exceed 100 characters",
    }),
    author: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Author is required",
        "string.min": "Author must be at least 3 characters",
        "string.max": "Author cannot exceed 100 characters",
    }),
    duration: Joi.number().min(6).messages({
        "number.base": "Duration must be a number",
        "number.min": "Duration must be at least 1 minute",
        "any.required": "Duration is required",
    }),
    language: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Language is required",
        "string.min": "Language must be at least 2 characters",
        "string.max": "Language cannot exceed 50 characters",
    }),
    audioFile: Joi.string().uri().required()
});

export const updateAudiobookValidator = addAudiobookValidator.fork(
    ["title", "author", "language", "duration"],
    (schema) => schema.optional()
);
