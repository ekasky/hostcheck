import nodemailer, { Transporter } from 'nodemailer';
import { IEmailProvider } from './IEmailProvider';
import ENV from '../../config/Env';
import logger from '../../utils/Logger';

export class NodemailerProvider implements IEmailProvider {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: ENV.NODE_MAILER_SMTP_HOST,
            port: ENV.NODE_MAILER_SMTP_PORT,
            secure: ENV.NODE_MAILER_SMTP_SECURE,
            auth: {
                user: ENV.NODE_MAILER_SMTP_USER,
                pass: ENV.NODE_MAILER_SMTP_PASSWORD,
            },
        });
    }

    async sendEmail(toEmail: string, subject: string, bodyHtml: string, bodyText: string): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
                from: ENV.NODE_MAILER_SMTP_USER,
                to: toEmail,
                subject: subject,
                html: bodyHtml,
                text: bodyText,
            });

            logger.info(
                `Email sent via Nodemailer (${ENV.NODE_MAILER_SMTP_HOST}) to ${toEmail} - ID: ${info.messageId}`,
            );
        } catch (error: any) {
            throw error;
        }
    }
}
