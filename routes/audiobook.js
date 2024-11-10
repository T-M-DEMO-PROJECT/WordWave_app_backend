import { Router } from "express";
import { addAudiobook, listAudiobooks,updateAudiobook, addReview } from "../controllers/audiobook.js";
import { isAuthenticated, admin } from "../middlewares/auth.js";
import { audiobookUpload } from "../middlewares/upload.js";

const audiobookRouter = Router();

audiobookRouter.post('/audiobooks', isAuthenticated, admin, addAudiobook);
audiobookRouter.patch('/audiobooks/:id', isAuthenticated, admin, updateAudiobook);
audiobookRouter.get('/audiobooks', listAudiobooks);
audiobookRouter.post('/audiobooks/review', isAuthenticated, addReview);

audiobookRouter.post('/audiobooks/upload', audiobookUpload, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully", fileUrl: req.file.path });
});

export default audiobookRouter;