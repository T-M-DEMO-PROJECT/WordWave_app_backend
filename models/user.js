import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true, index: true},
    password:{type: String, required: true},
    author: { type: Boolean, default: false }
},{
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema);