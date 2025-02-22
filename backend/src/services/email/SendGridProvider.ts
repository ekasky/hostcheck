import sendgrid, { MailDataRequired } from '@sendgrid/mail';
import { IEmailProvider } from './IEmailProvider';
import ENV from '../../config/Env';
import logger from '../../utils/Logger';

export class SendGridProvider implements IEmailProvider {
    constructor() {
        sendgrid.setApiKey(ENV.TWILLO_SEND_GRID_API_KEY);
    }

    async sendEmail(toEmail: string, subject: string, bodyHtml: string, bodyText: string): Promise<void> {
        const message: MailDataRequired = {
            to: toEmail,
            from: ENV.TWILLO_SENDGRID_SENDER_EMAIL,
            subject: subject,
            html: bodyHtml,
            text: bodyText,
        };

        try {
            const response = await sendgrid.send(message);

            logger.info(`Email send via Twillo SendGrid: ${response}`);
        } catch (error: any) {
            throw error;
        }
    }
}
