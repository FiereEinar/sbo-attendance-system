import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PORT } from './constants/env';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error';
import { healthcheck } from './middlewares/healthcheck';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(healthcheck);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
);
