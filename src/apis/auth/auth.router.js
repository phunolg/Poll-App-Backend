import { Router } from "express";
import userRouter from '../../routes/user.route.js';
import AuthController from '../auth/auth.controller.js';
import authController from "../auth/auth.controller.js";
import VerifyMiddleware from "../../middleware/verify.middleware.js";


const router = Router();
router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/get-me', 
    VerifyMiddleware.checkAuth,
    authController.getMe
)
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export default router;