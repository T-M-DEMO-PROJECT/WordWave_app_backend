import { Router } from "express";
import { addRegister, addLogin, getProfile, addLogout, updatedProfile, deleteUser } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post('/users/register', addRegister);
userRouter.post('/users/login', addLogin);
userRouter.get('/users/oneUser', isAuthenticated, getProfile);
userRouter.post('/users/logout', isAuthenticated, addLogout);
userRouter.post('/users/me', isAuthenticated, userAvatarUpload.single('avatar'), updatedProfile);
userRouter.delete('/users/delete', deleteUser);

export default userRouter;