import emailService from '../services/emailService.js';

export const sendTestEmail = async (req, res) => {
    try {
        const { to, subject, html } = req.body;
        await emailService.sendEmail(to, subject, html);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
};

export const sendWelcomeEmail = async (req, res) => {
    try {
        const { user } = req.body;
        await emailService.sendWelcomeEmail(user);
        res.status(200).json({ message: 'Welcome email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send welcome email' });
    }
};

export const sendPasswordResetEmail = async (req, res) => {
    try {
        const { user, resetToken } = req.body;
        await emailService.sendPasswordReset(user, resetToken);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send password reset email' });
    }
};
