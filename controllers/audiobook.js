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
        const audiobooks = await AudiobookModel.find();
        res.json(audiobooks);
    } catch (error) {
        next(error);
    }
};

export const getAudiobookById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the audiobook ID from the request parameters

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
