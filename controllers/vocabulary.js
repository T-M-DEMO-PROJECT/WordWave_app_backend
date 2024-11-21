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

        const { word, meaning, exampleSentence, synonyms, antonyms, partOfSpeech, audiobookId } = value;

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
        // Read the words from the word.json file
        const data = await fs.readFile(new URL("../data/word.json", import.meta.url));
        const words = JSON.parse(data); // Parse the JSON data

        // Handle case where no words are found in the JSON file
        if (words.length === 0) {
            return res.status(404).json({
                error: "No words found in the database."
            });
        }

        // Select a random word from the list of all words
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


// Function to fetch two random words
export const getTwoRandomWords = async (req, res) => {
    try {
        // Read the words from the word.json file
        const data = await fs.readFile(new URL("../data/word.json", import.meta.url));
        const words = JSON.parse(data); // Parse the JSON data

        // Handle case where no words are found in the JSON file
        if (!Array.isArray(words) || words.length === 0) {
            return res.status(404).json({
                error: "No words found in the database."
            });
        }

        // Handle case where there is only one word
        if (words.length === 1) {
            return res.status(200).json({
                message: "Only one word available.",
                data: [words[0]], // Return the only word available
            });
        }

        // Select two unique random words
        const randomIndices = new Set();
        while (randomIndices.size < 2) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomIndices.add(randomIndex);
        }

        // Get the random words based on the generated indices
        const randomWords = Array.from(randomIndices).map(index => words[index]);

        // Respond with the randomly selected words
        return res.status(200).json({
            message: "Two random vocabulary words fetched successfully.",
            data: randomWords,
        });
    } catch (error) {
        console.error("Error fetching random vocabulary words:", error);

        // Respond with an internal server error status
        return res.status(500).json({
            error: "An internal server error occurred while fetching random words.",
        });
    }
};