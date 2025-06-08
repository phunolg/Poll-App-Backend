import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

class UserModel {
    // Create a user
    async createUser(email, password, role = 'User') {
        const db = getDB(); 
        return await db.collection("users").insertOne({ email, password, role }); // Truy vấn tất cả người dùng
    }

    // Get all users
    async getAllUsers() {
        const db = getDB();
        return await db.collection("users").find({}).toArray();
    }

    // Get a user by ID
    async getUserById(id) {
        const db = getDB();
        return await db.collection("users").findOne({ _id: new ObjectId(id) });
    }

    async findOne(condition) {
        const db = getDB();
        return await db.collection("users").findOne(condition);
    }

    async updateUserByEmail(email, updateData) {
        const db = getDB();
        return await db.collection("users").updateOne(
            { email: email }, // Tìm kiếm bằng email
            { $set: updateData }
        );
    }

    // Delete a user by ID
    async deleteUserById(id) {
        const db = getDB();
        return await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    }

    async getUserByEmailAndPassword(email, password) {
        const db = getDB();

        // Tìm người dùng theo email trước
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return null;
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }

    async getUserByEmail(email) {
        const db = getDB();
        return await db.collection('users').findOne({ email });
    }

    async checkResetPasswordToken(email, resetPasswordToken) {
        try {
            const result = await getDB().collection('users').findOne({
                email: email,
                resetPasswordToken: resetPasswordToken, // Kiểm tra token
                resetPasswordExpires: { $gt: new Date() }, // Kiểm tra thời gian hết hạn
            });
            console.log('result', result);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async resetPassword(newPassword, email) {
        try {
            const result = await getDB().collection('users').updateOne(
                { email: email },
                {
                    $set: {
                        password: newPassword,
                        resetPasswordToken: null,
                        resetPasswordExpiration: null,
                        lastResetPasswordDate: new Date(),
                    },
                }
            );
            return result.matchedCount > 0;

        } catch (error) {
            throw error;
        }
    }

    // Lấy vai trò người dùng
    async getUserRoleById(id) {
        const db = getDB();
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) }, { projection: { role: 1 } });
        return user?.role || 'User';
    }
}

export default new UserModel();