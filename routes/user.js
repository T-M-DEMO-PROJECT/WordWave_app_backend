import { Router } from "express";
import { addRegister, addLogin, getProfile, addLogout, updatedProfile, deleteUser} from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { isAuthenticated, updateStreak } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post('/users/register', addRegister);
userRouter.post('/users/login', addLogin);
userRouter.get('/users/oneUser', isAuthenticated, getProfile);
userRouter.post('/users/logout', isAuthenticated, addLogout);
userRouter.patch('/users/me', isAuthenticated, userAvatarUpload.single('avatar'), updatedProfile);
userRouter.delete('/users/delete', isAuthenticated, deleteUser);
userRouter.post('/users/update-streak', isAuthenticated, updateStreak); 

export default userRouter;