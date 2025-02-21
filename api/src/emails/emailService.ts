import { NODE_ENV } from '../config/env';
import { sendDevMail } from './nodeMailerService';
import { sendSesEmail } from './sesService';

export const sendEmail = (toEmail: string, subject: string, bodyHtml: string, bodyText: string) => {

    if(NODE_ENV === 'production') {

        sendSesEmail(toEmail, subject, bodyHtml, bodyText);

    }
    else {

        sendDevMail(toEmail, subject, bodyHtml, bodyText)

    }

};