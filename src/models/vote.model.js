import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

class VoteModel {
    async createVote(userId, polls_Id, Selectedoptions) {
        const db = getDB();
        const pollDocument = await db.collection("polls").findOne({ _id: new ObjectId(polls_Id) });
        if (!pollDocument) {
            throw new Error(`Poll with ID '${polls_Id}' not found.`);
        }

        if (pollDocument.isOpen === false) {
            throw new Error(`Poll with ID '${polls_Id}' is currently locked. Voting is not allowed.`);
        }

        if (!pollDocument.options || !Array.isArray(pollDocument.options)) {
            throw new Error(`Poll with ID '${polls_Id}' does not have a valid 'options' array.`);
        }

        for (const selectedOpt of Selectedoptions) {
            //_id và name của option
            const isValidOptionInPoll = pollDocument.options.some(
                pollOption => pollOption._id && typeof pollOption._id.equals === 'function' && pollOption._id.equals(new ObjectId(selectedOpt._id)) && pollOption.name === selectedOpt.name
            );

            if (!isValidOptionInPoll) {
                throw new Error(`Option with ID '${selectedOpt._id}' and name '${selectedOpt.name}' does not match any valid option in poll '${polls_Id}'.`);
            }

            // tìm lượt vote
            const existingVote = await db.collection("votes").findOne({
                userId: new ObjectId(userId),
                polls_Id: new ObjectId(polls_Id),
                "Selectedoptions._id": new ObjectId(selectedOpt._id)
            });

            if (existingVote) {
                throw new Error(`User has already voted for option '${selectedOpt.name}' in this poll.`);
            }
        }
        
        const newVote = {
            userId: new ObjectId(userId),
            polls_Id: new ObjectId(polls_Id),
            Selectedoptions: Selectedoptions.map(option => ({
                _id: new ObjectId(option._id),
                name: option.name,
            })),
            createdAt: new Date(),
        };

        const result = await db.collection("votes").insertOne(newVote);
        return { ...newVote, _id: result.insertedId };
    }

    // Lấy tất cả votes theo poll ID
    async getVotesByPollId(polls_Id) {
        const db = getDB();
        return await db.collection("votes").find({ polls_Id: new ObjectId(polls_Id) }).toArray();
    }

    // Lấy tất cả votes theo user ID
    async getVotesByUserId(userId) {
        const db = getDB();
        return await db.collection("votes").find({ userId: new ObjectId(userId) }).toArray();
    }

    // Xóa tất cả votes theo poll ID
    async deleteVotesByPollId(polls_Id) {
        const db = getDB();
        const result = await db.collection("votes").deleteMany({ polls_Id: new ObjectId(polls_Id) });
        return result.deletedCount > 0; // Trả về true nếu xóa thành công
    }

    // Xóa một vote theo vote ID
    async deleteVoteById(voteId) {
        const db = getDB();
        const result = await db.collection("votes").deleteOne({ _id: new ObjectId(voteId) });
        return result.deletedCount > 0; // Trả về true nếu xóa thành công
    }

     // Hủy một lựa chọn vote cụ thể của người dùng trong một poll
    async unvoteOption(userId, pollId, optionId) {
        const db = getDB();
        const pollDocument = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });
        if (!pollDocument) {
            throw new Error(`Poll with ID '${pollId}' not found.`);
        }
        if (pollDocument.isOpen === false) {
            throw new Error(`Poll with ID '${pollId}' is currently locked. Unvoting is not allowed.`);
        }
        try {
            const result = await db.collection("votes").updateOne(
                {
                    userId: new ObjectId(userId),
                    polls_Id: new ObjectId(pollId),
                    "Selectedoptions._id": new ObjectId(optionId)
                },
                {
                    $pull: { Selectedoptions: { _id: new ObjectId(optionId) } }
                }
            );
            // nếu update => modifiedCount == 1
            return result.modifiedCount > 0;
        } catch (error) {
            console.error("Error in VoteModel.unvoteOption:", error);
            throw error;
        }
    }
}

export default new VoteModel();