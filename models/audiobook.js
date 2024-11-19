import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";

const audiobookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    narrator: { type: String },
    duration: { type: Number }, // duration in minutes
    genre: { type: String },
    description: { type: String },
    language: { type: String, required: true },
    releaseDate: { type: Date },
    isFeatured: { type: Boolean, default: false },
    coverImage: { type: String }, // URL for the audiobook cover
    audioFile: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User"},
}, {
    timestamps: true,
});

audiobookSchema.index({ category: 'text', title: 'text'});

audiobookSchema.plugin(toJSON);

export const AudiobookModel = model("Audiobook", audiobookSchema);
