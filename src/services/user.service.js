import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

class UserService {
    // Create a user
    async createUser(email, password) {
        try {
            const user = await getDB().collection("users").insertOne({ email, password });
            return user;
        } catch (err) {
            throw err;
        }
    }

    // Get all users
    async getAllUsers() {
        try {
            const users = await getDB().collection("users").find({}).toArray();
            return users;
        } catch (err) {
            throw err;
        }
    }

    // Get a user by ID
    async getUser(id) {
        try {
            const user = await getDB().collection("users").findOne({ _id: new ObjectId(id) });
            return user;
        } catch (err) {
            throw err;
        }
    }

    // Update a user by ID
    async updateUser(id, updateData) {
        try {
            const result = await getDB().collection("users").updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Delete a user by ID
    async deleteUser(id) {
        try {
            const result = await getDB().collection("users").deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();