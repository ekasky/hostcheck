import nodemailer from 'nodemailer';

import ENV from '../config/env';

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENV.GMAIL.GMAIL_USER,
        pass: ENV.GMAIL.GMAIL_APP_PASSWORD
    }
});

export const sendDevMail = async (toEmail: string, subject: string, bodyHtml: string, bodyText: string) => {

    try {

        await gmailTransporter.sendMail({
            from: ENV.GMAIL.GMAIL_USER,
            to: toEmail,
            subject,
            text: bodyText,
            html: bodyHtml,
          });

          console.log(`✅ Email sent via Nodemailer (Gmail) to ${toEmail}`);

    }
    catch(error: any) {

        console.error(`❌ Error sending email via Gmail:`, error);

    }

};