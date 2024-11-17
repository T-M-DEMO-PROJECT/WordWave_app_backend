// import express from "express";
// import { getRandomWord, addNewWord } from "../controllers/vocabulary.js";

// const vocabularyRouter = Router();

// vocabularyRouter.get("/vocabulary/random", getRandomWord); // Fetch a random word
// vocabularyRouter.post("/vocabulary/add", addNewWord);      // Add a new word

// export default vocabularyRouter;

import { Router } from "express";
import { addVocabulary, getRandomVocabulary } from "../controllers/vocabulary.js";
import { isAuthenticated } from "../middlewares/auth.js";

const vocabularyRouter = Router();

// Add vocabulary
vocabularyRouter.post("/vocabulary", isAuthenticated, addVocabulary);

// Get vocabulary list
vocabularyRouter.get("/vocabulary", isAuthenticated, getRandomVocabulary);

export default vocabularyRouter;
