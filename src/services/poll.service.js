import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb"
import PollModel from "../models/poll.model.js";

class PollService {
    async createPoll(title, author, options) {
        return await PollModel.createPoll(title, author, options);
    }

    async getAllPolls() {
        return await PollModel.getAllPolls();
    }

    async getPollById(pollId) {
        return await PollModel.getPollById(pollId);
    }

    async updatePoll(pollId, updateData) {
        return await PollModel.updatePoll(pollId, updateData);
    }

    async deletePoll(pollId) {
        return await PollModel.deletePoll(pollId);
    }

    async lockPoll(pollId) {
        return await PollModel.lockPoll(pollId);
    }

    async unlockPoll(pollId) {
        return await PollModel.unlockPoll(pollId);
    }
}

export default new PollService();