import { SendEmailCommand, SendEmailCommandInput, SESClient } from '@aws-sdk/client-ses';
import { IEmailProvider } from './IEmailProvider';
import ENV from '../../config/Env';
import logger from '../../utils/Logger';

export class SesProvider implements IEmailProvider {
    private sesClient: SESClient = new SESClient({
        region: ENV.AWS_SES_REGION,
        credentials: {
            accessKeyId: ENV.AWS_SES_ACCESS_KEY_ID,
            secretAccessKey: ENV.AWS_SES_SECRET_ACCESS_KEY,
        },
    });

    async sendEmail(toEmail: string, subject: string, bodyHtml: string, bodyText: string): Promise<void> {
        const params: SendEmailCommandInput = {
            Source: ENV.AWS_SES_SENDER_EMAIL,
            Destination: {
                ToAddresses: [toEmail],
            },
            Message: {
                Subject: { Data: subject },
                Body: {
                    Html: { Data: bodyHtml },
                    Text: { Data: bodyText },
                },
            },
        };

        try {
            const command = new SendEmailCommand(params);
            const response = await this.sesClient.send(command);

            logger.info(`Email send via AWS SES: ${response.MessageId}`);
        } catch (error: any) {
            throw error;
        }
    }
}
