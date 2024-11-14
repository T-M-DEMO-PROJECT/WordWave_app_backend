// import { toJSON } from "@reis/mongoose-to-json";
// import { Schema, model } from "mongoose";

// // Vocabulary Schema
// const vocabularySchema = new Schema(
//     {
//         word: {
//             type: String,
//             required: true,
//             unique: true,
//             trim: true,
//         },
//         definition: {
//             type: String,
//             required: true,
//         },
//         partOfSpeech: {
//             type: String,
//             required: true,
//             enum: ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"],
//         },
//         synonyms: {
//             type: [String], // Array of synonyms
//             default: [],
//         },
//         antonyms: {
//             type: [String], // Array of antonyms
//             default: [],
//         },
//         example: {
//             type: String, // Example sentence using the word
//             default: "",
//         },
//     },
//     {
//         timestamps: true, // Automatically adds createdAt and updatedAt
//     }
// );

// vocabularySchema.plugin(toJSON);

// // Create and export Vocabulary model
// export const VocabularyModel = model("Vocabulary", vocabularySchema);