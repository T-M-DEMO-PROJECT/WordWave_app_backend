import { UserModel } from "../models/user.js";

export const addRegister = (req, res, next) => {
    try {
        return res.status(422).json('user already exists');
    } catch (error) {
        next(error);
    }
}

export const addLogin = (req, res, next) => {
    try {
        return res.json('logged in successfully');
    } catch (error) {
        next(error);
    }
}

export const getProfile = (req, res, next) => {
    try {
        return res.json(user);
    } catch (error) {
        
    }
}

export const addLogout = (req, res, next) => {
    try {
        return res.json('logged out');
    } catch (error) {
        
    }
}

export const deleteUser = (req, res, next) => {
    try {
        return res.json('user profile deleted')
    } catch (error) {
        
    }
}

export const updatedProfile = (req, res, next) => {
    try {
        return res.json('user profile updated')
    } catch (error) {

    }
}