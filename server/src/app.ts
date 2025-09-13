import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import { PORT } from './constants/env';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error';
import { healthcheck } from './middlewares/healthcheck';

import authRouter from './routes/auth.route';
import connectToMongoDB from './database/mongodb';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', healthcheck);

// Routes
app.use('/api/v1/auth', authRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
	await connectToMongoDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
