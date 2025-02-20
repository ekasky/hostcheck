import express, { Application } from 'express';

import './config/env';
import './config/db';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './routes/authRoutes';

export const app: Application = express();

/* Pre-routes middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use('/api/auth', authRouter);

/* Post routes middlewares */
app.use(errorHandler);