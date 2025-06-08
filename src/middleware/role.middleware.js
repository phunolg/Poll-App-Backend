import UserModel from '../models/user.model.js';

// Middleware kiểm tra quyền admin
export async function requireAdmin(req, res, next) {
    try {
        const userId = req.user;
        const role = await UserModel.getUserRoleById(userId);
        if (role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only.' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// Middleware kiểm tra quyền user hoặc admin
export async function requireUserOrAdmin(req, res, next) {
    try {
        const userId = req.user;
        const role = await UserModel.getUserRoleById(userId);
        if (role !== 'User' && role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: Users only.' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
