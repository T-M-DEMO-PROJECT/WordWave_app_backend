import { UserModel } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addRegisterValidator, addLoginValidator } from "../validators/user.js";
import { getStreakMessage } from "../utils/streakMessages.js";
import { sendEmail } from '../utils/emailService.js';
import { registrationEmailTemplate } from '../templates/emailTemplates.js'

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
        const newUser = await UserModel.create({
            ...value,
            password: hashedPassword
        });

        // Send welcome email
        try {
            await sendEmail(
                value.email,
                'Welcome to Our Platform!',
                registrationEmailTemplate(value.name)
            );
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Continue with registration even if email fails
        }

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
            { id: user.id, admin: user.admin }, // Include amin in the token payload
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );

        //respond to request
        res.json({
            message: 'user logged in!',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async(req, res, next) => {
    try {
        // find authenticated user from database
        const user = await UserModel.findById(req.auth.id).select({ password: false });
        res.json(user);
    } catch (error) {
      next(error); 
    }
}

export const addLogout = (req, res, next) => {
    try {
        // Optionally, clear a cookie for token storage
        res.clearCookie("token");

        return res.status(200).json({
            message: "Successfully logged out",
        });
    } catch (error) {
        next(error); // Forward error to middleware
    }
};


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
};

export const updatedProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Update fields only if provided
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (password) updates.password = bcrypt.hashSync(password, 20);

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

// Update Streak Logic
export const updateStreak = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.auth.id); // Get the authenticated user
        const today = new Date();
        const lastActiveDate = user.streak.lastActiveDate;

        if (!lastActiveDate) {
            // First activity
            user.streak.currentStreak = 1;
        } else {
            const diffInDays = Math.floor((today - new Date(lastActiveDate)) / (1000 * 60 * 60 * 24));

            if (diffInDays === 1) {
                // Continue streak
                user.streak.currentStreak += 1;
                if (user.streak.currentStreak > user.streak.longestStreak) {
                    user.streak.longestStreak = user.streak.currentStreak;
                }
            } else if (diffInDays > 1) {
                // Streak broken, reset current streak
                user.streak.currentStreak = 1;
            }
        }
        // Generate streak message
        const message = getStreakMessage(user.streak.currentStreak);
        console.log(message); // You can log it

        user.streak.lastActiveDate = today; // Update last active date
        await user.save();

        res.status(200).json({
            message: "Streak updated successfully",
            currentStreak: user.streak.currentStreak,
            longestStreak: user.streak.longestStreak,
        });
    } catch (error) {
        next(error); // Forward the error to your global error handler
    }
};