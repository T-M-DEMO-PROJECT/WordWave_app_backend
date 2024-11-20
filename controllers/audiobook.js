import mongoose from "mongoose";
import { AudiobookModel } from "../models/audiobook.js";
import { UserModel } from "../models/user.js";
import { addAudiobookValidator, updateAudiobookValidator } from "../validators/audiobook.js";
import { audiobookUpload } from "../middlewares/upload.js";

export const addAudiobook = async (req, res, next) => {
    try {
        const { error, value } = addAudiobookValidator.validate({...req.body, audioFile: req.file?.filename
        });
        // Proceed with adding the audiobook to the database
        await AudiobookModel.create({...value, user: req.auth.id});
        //Respond to request
        return res.status(201).json({ message: "Audiobook added successfully", data: value.audiobook });
    } catch (error) {
        next(error);
    }
};

export const listAudiobooks = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        //Fetch Audiobook from database
        const audiobooks = await AudiobookModel.find(JSON.parse(filter))
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);
        res.status(200).json(audiobooks);
    } catch (error) {
        next(error);
    }
};

export const getAudiobookById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the audiobook ID from the request parameters
        console.log("Received ID:", id); // Log the received ID

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        // Find audiobook by ID
        const audiobook = await AudiobookModel.findById(id);
        if (!audiobook) {
            return res.status(404).json({ error: "Audiobook not found" });
        }

        return res.status(200).json({ data: audiobook });
    } catch (error) {
        next(error); // Pass the error to your global error handler
    }
};

export const updateAudiobook = async (req, res, next) => {
    try {
        const { error, value } = updateAudiobookValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }
        // Proceed with updating the audiobook
        const audiobook = await AudiobookModel.findByIdAndUpdate(id, value, {
            new: true,
            runValidators: true,
        });

        if (!audiobook) {
            return res.status(404).json({ error: "Audiobook not found" });
        }
        res.status(200).json({ message: "Audiobook updated successfully", data: audiobook });
    } catch (error) {
        next(error);
    }
};

export const countAudiobooks = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        //count todos in database
        const count = await AudiobookModel.countDocuments(JSON.parse(filter));
        //Responto request
        res.json({ count });
    } catch (error) {
        next(error);
    }
};

// Example endpoint for when a user finishes listening to an audiobook
export const audiobookFinished = async (req, res) => {
    // Logic to handle audiobook completion, e.g., updating user progress

    // Now fetch two random words
    return getTwoRandomWords(req, res);
};

export const deleteAudiobook = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the audiobook ID from the request parameters

        // Find the audiobook by ID and delete it
        const audiobook = await AudiobookModel.findByIdAndDelete(id);

        if (!audiobook) {
            return res.status(404).json({ error: "Audiobook not found" });
        }

        // Respond to the request
        return res.status(200).json({ message: "Audiobook deleted successfully" });
    } catch (error) {
        next(error); // Pass the error to your global error handler
    }
};

export const addReview = async (req, res, next) => {
    try {
        const { audiobookId, comment, rating } = req.body;

        const audiobook = await AudiobookModel.findById(audiobookId);
        if (!audiobook) return res.status(404).json({ error: 'Audiobook not found' });

        audiobook.reviews.push({ userId: req.auth.id, comment, rating });
        await audiobook.save();

        res.json({ message: 'Review added successfully', audiobook });
    } catch (error) {
        next(error);
    }
};
