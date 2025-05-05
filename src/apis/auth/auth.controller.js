import authService from './auth.service.js';

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.register(email, password);
            return res.status(201).json({
                success: true,
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.status(200).json({
                success: true,
                token: token,
                message: 'Login successfully'
            });  
        } catch (err) {
            next(err);
        }
    }

    async getMe(req, res, next) {
        try {

            const userId = req.user;
            const user = await authService.getMe(userId);
            res.status(200).json({
                success: true,
                data: userId
            });
        } catch (err) {
            next(err);
        }
    }

}

export default new AuthController();