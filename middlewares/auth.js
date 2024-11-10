import { expressjwt } from "express-jwt";
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256'],
    requestProperty: 'auth',
});

export const admin = (req, res, next) => {
    if (!req.auth || !req.auth.admin) {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};
