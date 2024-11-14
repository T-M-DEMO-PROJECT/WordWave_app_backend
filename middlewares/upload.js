import multer from "multer";

import { multerSaveFilesOrg } from "multer-savefilesorg";

// Set up storage engine
export const localUpload = multer({ dest: 'uploads/' });

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiccessToken: process.env.SAVEFILESORG_API_KEY,
        realativePath: '/userAvatarIcon/*',
    }),
    preservePath: true
});

// Set up storage engine
// export const audiobookUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         limits: { fileSize: 1000000 }, // Limit file size to 1MB
//         relativePath: '/audiobook-api/african/*',
//     }),
//     preservePath: true
// });

// Initialize upload
// const upload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
//         limits: { fileSize: 1000000 }, // Limit file size to 1MB
//         fileFilter: (req, file, cb) => {
//             checkFileType(file, cb);
//             relativePath: '/audiobook-api/african/*'
//         }
//     }),
//     // .single('audioupload'),
//     preservePath: true
// });

// Function to check file type
// const checkFileType = (file, cb) => {
//     const allowedFileTypes = /mp3|wav|m4a/; // Adjust allowed file types
//     const extName = allowedFileTypes.test(file.originalname.split('.').pop().toLowerCase());
//     const mimeType = allowedFileTypes.test(file.mimetype);

//     if (extName && mimeType) {
//         return cb(null, true);
//     } else {
//         return cb(new Error("Invalid file type. Only audio files are allowed."));
//     }
// };

// // Initialize `multer` upload
// export const audiobookUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY, // Fixed typo
//         relativePath: '/audiobook-api/african/', // Adjusted to valid path
//     }),
//     limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1MB (1 * 1024 * 1024 bytes)
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     },
// }).single('audioFile');


const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4'];

const checkFileType = (file, cb) => {
    const extName = /\.(mp3|wav|m4a)$/i.test(file.originalname); // Check file extension
    const mimeType = allowedMimeTypes.includes(file.mimetype); // Check MIME type

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only MP3, WAV, or M4A files are allowed.'));
    }
};

export const audiobookUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/audiobooks/'); // Save locally
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: checkFileType,
}).single('audioFile');
