import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PORT } from './constants';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
);
