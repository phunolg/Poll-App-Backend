import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

class UserModel {
    // Create a user
    async createUser(email, password) {
        const db = getDB();
        return await db.collection("users").insertOne({ email, password });
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
}

export default new UserModel();