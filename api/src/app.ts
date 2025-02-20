import express, { Application } from 'express';

import './config/env';
import './config/db';

export const app: Application = express();

/* Pre-routes middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

/* Post routes middlewares */