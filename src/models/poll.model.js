import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

class PollModel {
    // Tạo một poll mới
    async createPoll(title, author, options) {
        const db = getDB();
        const newPoll = {
            title,
            author: new ObjectId(author),
            options: options.map(option => ({
                _id: new ObjectId(),
                name: option.name,
            })),
            isOpen: true, // Mặc định poll là mở khi tạo mới
            createdAt: new Date(),
        };

        const result = await db.collection("polls").insertOne(newPoll);
        return { ...newPoll, _id: result.insertedId };
    }

    // Lấy tất cả polls
    async getAllPolls() {
        const db = getDB();
        return await db.collection("polls").find({}).toArray();
    }

    // Lấy một poll theo ID
    async getPollById(pollId) {
        const db = getDB();
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });

        if (!poll) {
            return null;

        return poll;
        }
    }

    // Cập nhật một poll
    async updatePoll(pollId, updateData) {
        const db = getDB();
        const result = await db.collection("polls").updateOne(
            { _id: new ObjectId(pollId) },
            { $set: updateData }
        );
        return result.matchedCount > 0; // Trả về true nếu cập nhật thành công
    }

    // Xóa một poll
    async deletePoll(pollId) {
        const db = getDB();
        const result = await db.collection("polls").deleteOne({ _id: new ObjectId(pollId) });
        return result.deletedCount > 0; 
    }

    // Khóa một poll (chỉ admin)
    async lockPoll(pollId) {
        const db = getDB();
        const result = await db.collection("polls").updateOne(
            { _id: new ObjectId(pollId) },
            { $set: { isOpen: false } }
        );
        return result.matchedCount > 0; 
    }

    // Mở khóa một poll (chỉ admin)
    async unlockPoll(pollId) {
        const db = getDB();
        const result = await db.collection("polls").updateOne(
            { _id: new ObjectId(pollId) },
            { $set: { isOpen: true } }
        );
        return result.matchedCount > 0;
    }
}

export default new PollModel();