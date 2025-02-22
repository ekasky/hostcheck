import { Resend } from 'resend';
import { IEmailProvider } from './IEmailProvider';
import ENV from '../../config/Env';
import logger from '../../utils/Logger';

export class ResendProvider implements IEmailProvider {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(ENV.RESEND_API_KEY);
    }

    async sendEmail(toEmail: string, subject: string, bodyHtml: string, bodyText: string): Promise<void> {
        try {
            const response = await this.resend.emails.send({
                from: ENV.RESEND_SENDER_EMAIL,
                to: [toEmail],
                subject,
                html: bodyHtml,
                text: bodyText,
            });

            logger.info(`Email send via Resend: ${response.data?.id}`);
        } catch (error: any) {
            throw error;
        }
    }
}
