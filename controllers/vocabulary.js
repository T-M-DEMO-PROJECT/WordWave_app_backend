import { addVocabularyValidator } from "../validators/vocabulary.js";
import fs from "fs/promises";
import { VocabularyModel } from "../models/vocabulary.js";
import { AudiobookModel } from "../models/audiobook.js";

const words = JSON.parse(await fs.readFile(new URL("../data/word.json", import.meta.url)));

export const addVocabulary = async (req, res, next) => {
    try {
        // Validate incoming request body
        const { error, value } = addVocabularyValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { word, meaning, exampleSentence, audiobookId } = value;

        // Check if audiobook exists
        const audiobook = await AudiobookModel.findById(audiobookId);
        if (!audiobook) {
            return res.status(404).json({ error: "Audiobook not found" });
        }

        // Save the vocabulary word
        const vocabulary = await VocabularyModel.create({
            word,
            meaning,
            exampleSentence,
            audiobook: audiobookId,
            user: req.auth.id, // Assuming the authenticated user ID is available in `req.auth.id`
        });

        return res.status(201).json({
            message: "Vocabulary word added successfully",
            data: vocabulary,
        });
    } catch (error) {
        next(error);
    }
};

export const getRandomVocabulary = (req, res) => {
    try {
        const { category, difficulty } = req.query; // Read filters from query parameters

        // Filter words based on provided parameters
        let filteredWords = words;
        if (category) {
            filteredWords = filteredWords.filter((word) => word.category === category);
        }
        if (difficulty) {
            filteredWords = filteredWords.filter((word) => word.difficulty === difficulty);
        }

        // If no words match the filter, return an error
        if (filteredWords.length === 0) {
            return res.status(404).json({ error: "No words found matching the criteria" });
        }

        // Pick a random word from the filtered words
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        const randomWord = filteredWords[randomIndex];

        return res.status(200).json({
            message: "Random word fetched successfully",
            data: randomWord,
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};
