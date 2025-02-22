import express, { Application, Request, Response } from 'express';
import env from './config/Env';
import logger from './utils/Logger';
import { errorHandler } from './middleware/errorHandler';
import emailService from './services/email/EmailService';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = env.PORT;

        this.setupMiddleware();
        this.registerRoutes();
        this.setupErrorHandling();
    }

    public start(): void {
        this.app.listen(this.port, () => logger.info(`Server is running on port ${this.port}`));
    }

    public getApp(): Application {
        return this.app;
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private registerRoutes(): void {
        this.app.get('/send', async (req: Request, res: Response) => {
            await emailService.sendEmail(
                'ekasky25@gmail.com',
                'TEST EMAIL 123',
                '<h1>TEST EMAIL 123</h1>',
                'TEST EMAIL 123',
            );
            res.status(200).send('Sent');
        });
    }

    private setupErrorHandling(): void {
        this.app.use(errorHandler);
    }
}

/* Start the server */
const server = new Server();
server.start();

/* Export the app */
export default server.getApp();
