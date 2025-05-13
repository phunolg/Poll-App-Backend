import { Router } from 'express';
import userRouter from './user.route.js';
import authRouter from '../apis/auth/auth.router.js';
const router = Router();
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
