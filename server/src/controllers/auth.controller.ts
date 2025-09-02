import asyncHandler from 'express-async-handler';
import { createUser } from '../services/user.service';
import { createUserSchema } from '../schemas/user.schema';

export const loginController = asyncHandler(async (req, res) => {
	res.json({ message: 'Signed up' });
});

export const signupController = asyncHandler(async (req, res) => {
	const body = createUserSchema.parse(req.body);
	const user = await createUser(body);

	res.json({ message: 'Created User', user });
});
