import asyncHandler from 'express-async-handler';
import { createUser } from '../services/user.service';
import { createUserSchema } from '../schemas/user.schema';

export const loginController = asyncHandler(async (req, res) => {
	const body = createUserSchema.parse(req.body);
	const user = await createUser(body);

	console.log('Request Body: ', req.body);
	console.log('User: ', user);

	res.json({ message: 'Created User', user });
});
