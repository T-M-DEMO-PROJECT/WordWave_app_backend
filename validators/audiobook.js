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
    narrator: Joi.string().min(3).max(100).optional().allow("").messages({
        "string.min": "Narrator must be at least 3 characters",
        "string.max": "Narrator cannot exceed 100 characters",
    }),
    duration: Joi.number().min(1).required().messages({
        "number.base": "Duration must be a number",
        "number.min": "Duration must be at least 1 minute",
        "any.required": "Duration is required",
    }),
    genre: Joi.string().min(3).max(50).optional().messages({
        "string.min": "Genre must be at least 3 characters",
        "string.max": "Genre cannot exceed 50 characters",
    }),
    description: Joi.string().max(500).optional().allow("").messages({
        "string.max": "Description cannot exceed 500 characters",
    }),
    language: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Language is required",
        "string.min": "Language must be at least 2 characters",
        "string.max": "Language cannot exceed 50 characters",
    }),
    releaseDate: Joi.date().optional().messages({
        "date.base": "Release date must be a valid date",
    }),
    isFeatured: Joi.boolean().optional().default(false).messages({
        "boolean.base": "Is Featured must be a boolean value",
    }),
    coverImage: Joi.string().uri().optional().allow("").messages({
        "string.uri": "Cover Image must be a valid URL",
    }),
    audioFileUrl: Joi.string().uri().required()
});

export const updateAudiobookValidator = addAudiobookValidator.fork(
    ["title", "author", "language", "duration"],
    (schema) => schema.optional()
);
