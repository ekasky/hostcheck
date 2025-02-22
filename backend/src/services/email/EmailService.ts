import { IEmailProvider } from './IEmailProvider';
import ENV from '../../config/Env';
import { SesProvider } from './SesProvider';
import { ResendProvider } from './ResendProvider';
import { SendGridProvider } from './SendGridProvider';
import { NodemailerProvider } from './NodemailerProvider';

export class EmailService {
    private static instance: EmailService;
    private emailProvider: IEmailProvider;

    private constructor() {
        switch (ENV.EMAIL_PROVIDER) {
            case 'SES':
                this.emailProvider = new SesProvider();
                break;
            case 'RESEND':
                this.emailProvider = new ResendProvider();
                break;
            case 'SEND_GRID':
                this.emailProvider = new SendGridProvider();
                break;
            case 'NODEMAILER':
                this.emailProvider = new NodemailerProvider();
                break;
            default:
                this.emailProvider = new SesProvider();
                break;
        }
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    public async sendEmail(toEmail: string, subject: string, bodyHtml: string, bodyText: string): Promise<void> {
        return this.emailProvider.sendEmail(toEmail, subject, bodyHtml, bodyText);
    }
}

const emailService = EmailService.getInstance();
export default emailService;
