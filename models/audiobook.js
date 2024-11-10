import { Schema, model } from "mongoose";

const audiobookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    narrator: { type: String },
    duration: { type: Number, required: true }, // duration in minutes
    genre: { type: String },
    description: { type: String },
    language: { type: String, required: true },
    releaseDate: { type: Date },
    isFeatured: { type: Boolean, default: false },
    coverImage: { type: String }, // URL for the audiobook cover
    audioFileUrl: { type: String, required: true },
}, {
    timestamps: true,
});

export const AudiobookModel = model("Audiobook", audiobookSchema);
