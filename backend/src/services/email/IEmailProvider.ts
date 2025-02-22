export interface IEmailProvider {
    sendEmail(toEmail: string, subject: string, bodyHtml: string, bodyText: string): Promise<void>;
}
