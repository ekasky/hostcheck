export const accountVerificationTemplate = (name: string, verificationLink: string) => {
    return {
        subject: 'Verify Your Account - HostCheckr',
        bodyHtml: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Account</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                        font-size: 22px;
                    }
                    p {
                        color: #555;
                        font-size: 16px;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 24px;
                        margin: 20px 0;
                        color: #ffffff !important;
                        background: #007bff;
                        text-decoration: none;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #888;
                    }
                    .footer a {
                        color: #007bff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome, ${name}!</h1>
                    <p>Thank you for signing up. Please verify your email address to activate your account.</p>
                    <a href="${verificationLink}" class="button">Verify My Account</a>
                    <p>If you did not create this account, you can safely ignore this email.</p>
                    <p class="footer">Need help? <a href="https://yourwebsite.com/support">Contact Support</a></p>
                </div>
            </body>
            </html>
        `,
        bodyText: `Hello ${name},

            Thank you for signing up. Please verify your email address to activate your account by clicking the link below:

            ${verificationLink}

            If you did not create this account, you can ignore this email.

            Need help? Visit our support page: https://yourwebsite.com/support
        `
    };
};
