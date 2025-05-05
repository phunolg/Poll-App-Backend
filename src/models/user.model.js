import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

class UserModel {
    // Create a user
    async createUser(email, password) {
        const db = getDB(); // Lấy kết nối đến cơ sở dữ liệu
        return await db.collection("users").insertOne({ email, password }); // Truy vấn tất cả người dùng
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

    // Update a user by ID
    async updateUserById(id, updateData) {
        const db = getDB();
        return await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
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
}

export default new UserModel();