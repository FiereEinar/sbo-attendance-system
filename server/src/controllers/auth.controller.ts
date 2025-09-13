import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { createUserSchema, loginSchema } from '../schemas/user.schema';
import appAssert from '../errors/app-assert';
import { BAD_REQUEST } from '../constants/http';
import { BCRYPT_SALT } from '../constants/env';
import SessionModel from '../models/mongodb/session.model';
import UserModel from '../models/mongodb/user.model';

/**
 * POST /api/v1/auth/login - Login
 */
export const loginController = asyncHandler(async (req, res) => {
	const body = loginSchema.parse(req.body);
	const user = await UserModel.findOne({ email: body.email });

	// Check if user exists
	appAssert(user, BAD_REQUEST, 'User not found');

	// Check password
	const match = await bcrypt.compare(body.password, user.password);
	appAssert(match, BAD_REQUEST, 'Incorrect password');

	// TODO: implement sessions & JWT
	// const session = await SessionModel.create({
	// 	userID: user._id,
	// 	expiresAt: thirtyDaysFromNow(),
	// 	ip,
	// 	userAgent,
	// })

	res.json({ message: 'Signed up', user });
});

/**
 * POST /api/v1/auth/signup - Sign up
 */
export const signupController = asyncHandler(async (req, res) => {
	const body = createUserSchema.parse(req.body);

	// Check if passwords match
	appAssert(
		body.password === body.confirmPassword,
		BAD_REQUEST,
		'Passwords do not match'
	);

	// Hash password
	const hashedPassword = await bcrypt.hash(
		body.password,
		parseInt(BCRYPT_SALT)
	);
	body.password = hashedPassword;

	const user = await UserModel.create(body);

	res.json({ message: 'Created User', user });
});
