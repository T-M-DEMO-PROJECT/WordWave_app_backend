import { Router } from "express";
import { addAudiobook, listAudiobooks, updateAudiobook, getAudiobookById, countAudiobooks, deleteAudiobook, addReview } from "../controllers/audiobook.js";
import { isAuthenticated, author, updateStreak } from "../middlewares/auth.js";
import { audiobookUpload } from "../middlewares/upload.js";

const audiobookRouter = Router();

audiobookRouter.post('/audiobooks', isAuthenticated, author, audiobookUpload.single('audioFile'), addAudiobook);
audiobookRouter.get('/audiobooks/count', countAudiobooks)
audiobookRouter.patch('/audiobooks/:id', isAuthenticated, author, updateAudiobook);
audiobookRouter.get('/audiobooks', listAudiobooks);
audiobookRouter.get("/audiobooks/:id", getAudiobookById);
audiobookRouter.delete('/audiobooks/:id', isAuthenticated, author, deleteAudiobook);
audiobookRouter.post('/audiobooks/review', addReview);


export default audiobookRouter;