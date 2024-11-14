import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/words.json");

// Get a random word
export const getRandomWord = (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading words file" });

        const words = JSON.parse(data);
        const randomWord = words[Math.floor(Math.random() * words.length)];
        res.json(randomWord);
    });
};

// Add a new word
export const addNewWord = (req, res) => {
    const { word, definition } = req.body;

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading words file" });

        const words = JSON.parse(data);
        words.push({ word, definition });

        fs.writeFile(filePath, JSON.stringify(words, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing words file" });
            res.json({ message: "Word added successfully" });
        });
    });
};
