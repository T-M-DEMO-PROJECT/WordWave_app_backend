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

// audiobookRouter.post('/audiobooks/upload', audiobookUpload, (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }
//     res.json({ message: "File uploaded successfully", fileUrl: req.file.path });
// });

// audiobookRouter.post('/audiobooks/uploadWithFiles', isAuthenticated, admin, addAudiobookWithFiles);


export default audiobookRouter;