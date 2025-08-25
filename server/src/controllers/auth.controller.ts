import asyncHandler from 'express-async-handler';
import { createUser } from '../services/user.service';

export const loginController = asyncHandler(async (req, res) => {
	const user = createUser(req.body);

	res.json({ message: 'Created User', user });
});
