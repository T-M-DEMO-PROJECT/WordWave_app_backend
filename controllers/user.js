import { UserModel } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addRegisterValidator, addLoginValidator } from "../validators/user.js";

export const addRegister = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = addRegisterValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // check if user does not exist
        const user = await UserModel.findOne({ email: value.email });
        if (user){
            return res.status(422).json('user already exists');
        }
        //hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        //save user into database
        await UserModel.create({
            ...value,

            password: hashedPassword
        });
        res.json('user registered successfully');
    } catch (error) {
        next(error);
    }
}

export const addLogin = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = addLoginValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('user does not exist');
        }
        //compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('invalid credentials');
        }
        //sign a token for the user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        //respond to request
        res.json({
            message: 'user logged in!',
            accessToken: token
        });
        res.json('logged in successfully');
    } catch (error) {
        next(error);
    }
}

export const getProfile = async(req, res, next) => {
    try {
        // find authenticated user from database
        const user = await UserModel.findById(req.auth.id).select({ password: false });
        res.json(user);
        return res.json(userProfile);
    } catch (error) {
      next(error); 
    }
}

export const addLogout = (req, res, next) => {
    try {
        return res.json('logged out');
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.auth.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json('user profile deleted successfully')
    } catch (error) {
        next(error);
    }
}

// export const updatedProfile = (req, res, next) => {
//     try {
//         return res.json('user profile updated')
//     } catch (error) {

//     }
// }

export const updatedProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Update fields only if provided
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (password) updates.password = bcrypt.hashSync(password, 10);

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.auth.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
};