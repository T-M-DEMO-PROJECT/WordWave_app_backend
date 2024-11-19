import express from 'express';
import { sendTestEmail, sendWelcomeEmail, sendPasswordResetEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/api/email/test', sendTestEmail);
router.post('/api/email/welcome', sendWelcomeEmail);
router.post('/api/email/reset-password', sendPasswordResetEmail);

export default router;
