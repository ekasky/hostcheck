import express, { Application, Request, Response } from 'express';
import env from './config/Env';
import logger from './utils/Logger';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './routes/AuthRouter';

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
        this.app.use('/api/auth', authRouter);
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
