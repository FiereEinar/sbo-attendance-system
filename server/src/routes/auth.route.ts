import express from 'express';
import {
	loginController,
	logoutController,
	refreshTokenController,
	signupController,
} from '../controllers/auth.controller';
const router = express.Router();

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/logout', logoutController);
router.get('/refresh', refreshTokenController);

export default router;
