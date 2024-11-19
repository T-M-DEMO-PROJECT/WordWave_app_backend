export const registrationEmailTemplate = (userName) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                background-color: #f9f9f9;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #666666;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Our Platform!</h1>
            </div>
            <div class="content">
                <h2>Hello ${userName}!</h2>
                <p>Thank you for registering with us. We're excited to have you on board!</p>
                <p>Your account has been successfully created and you can now start using our services.</p>
                <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                <a href="#" class="button">Get Started</a>
            </div>
            <div class="footer">
                <p>This email was sent to you as part of your registration process.</p>
                <p>© 2024 Your Company Name. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
