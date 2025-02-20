import express, { Application } from 'express';

import './config/env';
import './config/db';
import { errorHandler } from './middleware/errorHandler';

export const app: Application = express();

/* Pre-routes middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

/* Post routes middlewares */
app.use(errorHandler);