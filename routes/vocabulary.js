

import { Router } from "express";
import { addVocabulary, getRandomVocabulary, getTwoRandomWords } from "../controllers/vocabulary.js";
import { isAuthenticated } from "../middlewares/auth.js";

const vocabularyRouter = Router();

// Add vocabulary
vocabularyRouter.post("/vocabulary", isAuthenticated, addVocabulary);

// Get vocabulary list
vocabularyRouter.get("/vocabulary", isAuthenticated, getRandomVocabulary);

vocabularyRouter.get("/vocabulary/two-random", isAuthenticated, getTwoRandomWords);

export default vocabularyRouter;
