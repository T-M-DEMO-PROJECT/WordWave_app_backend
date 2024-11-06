import multer from "multer";

import { multerSaveFilesOrg } from "multer-savefilesorg";

export const localUpload = multer({ dest: 'uploads/' });

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiccessToken: process.env.SAVEFILESORG_API_KEY,
        realativePath: '/userAvatarIcon/*',
    }),
    preservePath: true
});