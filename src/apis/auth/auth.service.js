import express from 'express';
import userRouter from '../../routes/user.route.js';
import UserModel from '../../models/user.model.js';
import authProvides from '../../providers/auth.provides.js';
import { getDB } from '../../config/db.config.js';
import bcrypt from 'bcrypt';
import { get } from 'http';
import { ObjectId } from 'mongodb';
import emailProvider from '../../providers/email.provides.js';
import hashProvider from '../../providers/hash.provides.js';

// nơi chứa các hàm xử lý logic liên quan đến người dùng
class authService {
    async register(email, password) {
        try {
            const existingUser = await UserModel.getAllUsers();
            if( existingUser.some((user) => user.email === email)) {
                throw new Error('User already exists');
            }

            // tạo hash 
            const hashedPassword = await bcrypt.hash(password, 10);

            // lưu eamil và hash vào db
            const newUser = await UserModel.createUser( email, hashedPassword );

            return newUser;
        }   catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }   
    }

    async login(email, password) {
        const user = await UserModel.getUserByEmail(email, password);
        if (!user) {
            throw new Error('Invalid email');
        }

        // sử dụng hàm compare của bcrypt để so sánh mật khẩu đã mã hóa với mật khẩu nhập vào   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = await authProvides.encodeToken(user);
        // console.log('Generated token:', token);
        return token;
    }

    async getMe(id) {
        try {
            const db = getDB();
            const user = await db.collection('users').findOne({ _id: new ObjectId(id) }); // Chuyển id thành ObjectId
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (err) {
            throw err;
        }
    }

    async forgotPassword(email) {
        try {
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                throw new Error('Email not found');
            }

            const resetPasswordToken = await bcrypt.genSalt(10);
            const resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // Hết hạn sau 15 phút
            const result = await UserModel.updateUserByEmail(email, {
                resetPasswordToken,
                resetPasswordExpires,
            });          
            if (!result) {
                throw new Error('Error setting reset password token');
            }

            await emailProvider.sendEmail({
                emailFrom: process.env.SMTP_USER,
                emailTo: email,
                emailSubject: 'Reset Password',
                emailText: `Your reset password token is: ${resetPasswordToken}`,
            });
            return true;

        } catch (error) {
            throw new Error('Error sending email: ' + error.message);
        }
    }

    async resetPassword(email, passwordResetToken, newPassword) {
        try {
            const user = await UserModel.checkResetPasswordToken(email, passwordResetToken);
            if (!user) {
                throw new Error('Invalid token or token expired');
            }

            const password = await hashProvider.generateHash(newPassword);
            const updateStatus = await UserModel.resetPassword(password, email);
            if (!updateStatus) {
                throw new Error('Error updating password');
            }
            return true;
        } catch (error) {
            throw new Error('Error resetting password: ' + error.message);
        }
    }
}

export default new authService();
