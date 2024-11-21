// import Joi from "joi";

// // Validator for adding a new vocabulary word
// export const addVocabularyValidator = Joi.object({
//     word: Joi.string()
//         .min(1)
//         .max(100)
//         .required()
//         .messages({
//             "string.empty": "Word is required.",
//             "string.min": "Word must have at least 1 character.",
//             "string.max": "Word cannot exceed 100 characters.",
//         }),

//     definition: Joi.string()
//         .min(5)
//         .max(500)
//         .required()
//         .messages({
//             "string.empty": "Definition is required.",
//             "string.min": "Definition must have at least 5 characters.",
//             "string.max": "Definition cannot exceed 500 characters.",
//         }),

//     partOfSpeech: Joi.string()
//         .valid("noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection")
//         .required()
//         .messages({
//             "any.required": "Part of speech is required.",
//             "any.only": "Part of speech must be one of noun, verb, adjective, adverb, pronoun, preposition, conjunction, or interjection.",
//         }),

//     synonyms: Joi.array()
//         .items(Joi.string().max(50))
//         .default([])
//         .messages({
//             "array.base": "Synonyms must be an array of strings.",
//             "string.max": "Each synonym cannot exceed 50 characters.",
//         }),

//     antonyms: Joi.array()
//         .items(Joi.string().max(50))
//         .default([])
//         .messages({
//             "array.base": "Antonyms must be an array of strings.",
//             "string.max": "Each antonym cannot exceed 50 characters.",
//         }),

//     example: Joi.string()
//         .max(500)
//         .optional()
//         .allow("")
//         .messages({
//             "string.max": "Example cannot exceed 500 characters.",
//         }),
// });

// // Validator for updating an existing vocabulary word
// export const updateVocabularyValidator = addVocabularyValidator.fork(
//     ["word", "definition", "partOfSpeech"],
//     (schema) => schema.optional()
// );

import Joi from "joi";

export const addVocabularyValidator = Joi.object({
    word: Joi.string().required().messages({
        "string.empty": "Word is required",
    }),
    meaning: Joi.string().required().messages({
        "string.empty": "Meaning is required",
    }),
    exampleSentence: Joi.string().required().messages({
        "string.empty": "Example sentence is required",
    }),
    partOfSpeech: Joi.string()
        .valid(
            "noun",
            "verb",
            "adjective",
            "adverb",
            "pronoun",
            "preposition",
            "conjunction",
            "interjection",
            "other"
        )
        .required()
        .messages({
            "any.required": "Part of speech is required.",
            "any.only": "Part of speech must be one of noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection, or other.",
        }),

    pronunciation: Joi.string()
        .max(100)
        .optional()
        .allow("")
        .messages({
            "string.max": "Pronunciation cannot exceed 100 characters.",}),
    synonyms: Joi.array()
        .items(Joi.string().max(50))
        .default([])
        .messages({
            "array.base": "Synonyms must be an array of strings.",
            "string.max": "Each synonym cannot exceed 50 characters.",
        }),

    antonyms: Joi.array()
        .items(Joi.string().max(50))
        .default([])
        .messages({
            "array.base": "Antonyms must be an array of strings.",
            "string.max": "Each antonym cannot exceed 50 characters.",
        }),
    audiobookId: Joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.pattern.base": "Invalid audiobook ID format",
            "string.empty": "Audiobook ID is required",
        }),
});

