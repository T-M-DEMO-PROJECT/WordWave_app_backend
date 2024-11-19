import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true, index: true},
    password:{type: String, required: true},
    author: { type: Boolean, default: false },
    streak: {
        currentStreak: { type: Number, default: 0 }, // Tracks the ongoing streak
        lastActiveDate: { type: Date, default: null }, // Last date of user activity
        longestStreak: { type: Number, default: 0 }, // User's record streak
    },
},{
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema);