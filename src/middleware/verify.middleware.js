import authProvide from '../providers/auth.provides.js';
import UserModel from '../models/user.model.js';

class VerifyMiddleware {
    async checkAuth(req, res, next) {
        try {
            const headers = req.headers.authorization;
            if (!headers) {
                throw new Error('No token provided');
            }
    
            const token = headers.split(' ')[1];
            if (!token) {
                throw new Error('Invalid token format');
            }
    
            const decoded = await authProvide.decodeToken(token);
            req.user = decoded.id; // Lấy id từ token và gắn vào req.user
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new VerifyMiddleware();