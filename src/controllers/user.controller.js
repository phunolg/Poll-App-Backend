import UserService from '../services/user.service.js';
import { body, param, validationResult } from 'express-validator';
import { getDB } from '../config/db.config.js';
import { ObjectId } from 'mongodb';

class UserController {
    // Create a user
    async createUser(req, res, next) {
        await body('email').isEmail().withMessage('Invalid email').run(req);
        await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
    
        try {
            const { email, password } = req.body;
            const user = await UserService.createUser(email, password);
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    // Get all users
    async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (err) {
            next(err);

        }
    }

    // Get a user by ID
    async getUser(req, res, next) {
        await param('id').isMongoId().withMessage('Invalid user ID').run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
    
        try {
            const id = req.params.id;
            const user = await UserService.getUser(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    // Update a user
    async updateUser(req, res, next) {
        await param('id').isMongoId().withMessage('Invalid user ID').run(req);
    
        await body('email').optional().isEmail().withMessage('Invalid email').run(req);
        await body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
    
        try {
            const id = req.params.id;
            const updateData = req.body;
            const result = await UserService.updateUser(id, updateData);
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "User updated successfully"
            });
        } catch (err) {
            next(err);
        }
    }

    // Delete a user
    async deleteUser(req, res, next) {
        await param('id').isMongoId().withMessage('Invalid user ID').run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
    
        try {
            const id = req.params.id;
            const result = await UserService.deleteUser(id);
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();