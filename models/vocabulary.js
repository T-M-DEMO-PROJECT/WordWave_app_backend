

import { Schema, model, Types } from "mongoose";

const VocabularySchema = new Schema(
    {
        word: {
            type: String,
            required: [true, "Word is required"],
            unique: true,
        },
        definition: {
            type: String,
            required: [true, "Meaning is required"],
        },
        partOfSpeech: {
            type: String,
            required: [true, "Part of speech is required"],
            enum: [
                "noun",
                "verb",
                "adjective",
                "adverb",
                "pronoun",
                "preposition",
                "conjunction",
                "interjection",
                "other",
            ],
        },
        pronunciation: {
            type: String,
            trim: true,
            default: "",
        },
        synonyms: {
            type: [String], // Array of synonyms
            default: [],
            validate: {
                validator: function (synonyms) {
                    return Array.isArray(synonyms) && synonyms.every((s) => typeof s === "string");
                },
                message: "Synonyms must be an array of strings.",
            },
        },
        antonyms: {
            type: [String], // Array of antonyms
            default: [],
            validate: {
                validator: function (antonyms) {
                    return Array.isArray(antonyms) && antonyms.every((a) => typeof a === "string");
                },
                message: "Antonyms must be an array of strings.",
            },
        },
        exampleSentence: {
            type: String,
            required: [true, "Example sentence is required"],
        },
        audiobook: {
            type: Types.ObjectId,
            ref: "Audiobook",
            required: [true, "Audiobook ID is required"],
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
    },
    { timestamps: true }
);

export const VocabularyModel = model("Vocabulary", VocabularySchema);
