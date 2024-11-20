import { expressjwt } from "express-jwt";
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256'],
    requestProperty: 'auth',
});

export const author = (req, res, next) => {
    if (!req.auth || !req.auth.author) {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

// export const updateStreak = async (req, res, next) => {
//     try {
//         const user = await UserModel.findById(req.auth.id); // Assume `req.auth.id` contains user ID

//         const today = new Date();
//         const lastActiveDate = user.streak.lastActiveDate;

//         if (!lastActiveDate) {
//             // First activity
//             user.streak.currentStreak = 1;
//         } else {
//             const diffInDays = Math.floor(
//                 (today - new Date(lastActiveDate)) / (1000 * 60 * 60 * 24)
//             );

//             if (diffInDays === 1) {
//                 // Continue streak
//                 user.streak.currentStreak += 1;
//                 if (user.streak.currentStreak > user.streak.longestStreak) {
//                     user.streak.longestStreak = user.streak.currentStreak;
//                 }
//             } else if (diffInDays > 1) {
//                 // Streak broken
//                 user.streak.currentStreak = 1;
//             }
//         }

//         user.streak.lastActiveDate = today; // Update last active date
//         await user.save();

//         next(); // Proceed to the next middleware or controller
//     } catch (error) {
//         next(error); // Forward the error to the error handler
//     }
// };

