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
            synonyms, 
            antonyms, 
            partOfSpeech,
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

export const getRandomVocabulary = async (req, res) => {
    try {
        const { category, difficulty } = req.query;

        // Build the query object dynamically
        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        // Fetch filtered words from the database
        const words = await VocabularyModel.find(query);

        // Handle case where no words match the criteria
        if (words.length === 0) {
            return res.status(404).json({
                error: "No words found matching the criteria."
            });
        }

        // Select a random word from the filtered list
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];

        // Respond with the randomly selected word
        return res.status(200).json({
            message: "Random vocabulary fetched successfully.",
            data: randomWord,
        });
    } catch (error) {
        console.error("Error fetching random vocabulary:", error);

        // Respond with an internal server error status
        return res.status(500).json({
            error: "An internal server error occurred.",
        });
    }
};

