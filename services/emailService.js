import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email.js';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(emailConfig);
    }

    async sendEmail(to, subject, html) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                html
            };

            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    async sendWelcomeEmail(user) {
        const subject = 'Welcome to Vocabulary Builder!';
        const html = `
            <h1>Welcome ${user.name}!</h1>
            <p>Thank you for joining Vocabulary Builder. We're excited to help you improve your vocabulary!</p>
            <p>Get started by exploring our audiobooks and creating your vocabulary lists.</p>
        `;
        return this.sendEmail(user.email, subject, html);
    }

    async sendPasswordReset(user, resetToken) {
        const subject = 'Password Reset Request';
        const html = `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
        `;
        return this.sendEmail(user.email, subject, html);
    }
}

export default new EmailService();
