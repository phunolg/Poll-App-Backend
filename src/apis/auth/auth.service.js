import express from 'express';
import userRouter from '../../routes/user.route.js';
import UserModel from '../../models/user.model.js';
import authProvides from '../../providers/auth.provides.js';
import { getDB } from '../../config/db.config.js';
import bcrypt from 'bcrypt';
import { get } from 'http';
import { ObjectId } from 'mongodb';


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
}

export default new authService();
