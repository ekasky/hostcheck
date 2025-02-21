import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

import ENV from '../config/env';

/* Create a SES client instance */
const sesClient: SESClient = new SESClient({
    region: ENV.AWS_SES.AWS_SES_REGION,
    credentials: {
        accessKeyId: ENV.AWS_SES.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS_SES.AWS_SES_SECRET_ACCESS_KEY
    }
});

/* Function to send a email */
export const sendSesEmail = async (toEmail: string, subject: string, bodyHtml: string, bodyText: string) => {

    const params: SendEmailCommandInput = {

        Source: ENV.AWS_SES.AWS_SES_SENDER_EMAIL,

        Destination: {

            ToAddresses: [toEmail]

        },
        Message: {

            Subject: { Data: subject },

            Body: {

                Html: { Data: bodyHtml },
                Text: { Data: bodyText }

            }

        }
        
    };

    try {

        const command  = new SendEmailCommand(params);
        const response = await sesClient.send(command);

        console.log('Email sent successfully:', response.MessageId);

        return response;

    }
    catch(error: any) {

        console.error('Error sending email:', error);

        throw error;

    }

};