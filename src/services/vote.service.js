import VoteModel from "../models/vote.model.js";

class VoteService {
    async createVote(userId, polls_Id, Selectedoptions) {
        return await VoteModel.createVote(userId, polls_Id, Selectedoptions);
    }

    async getVotesByPollId(polls_Id) {
        return await VoteModel.getVotesByPollId(polls_Id);
    }

    async getVotesByUserId(userId) {
        return await VoteModel.getVotesByUserId(userId);
    }

    async deleteVotesByPollId(polls_Id) {
        return await VoteModel.deleteVotesByPollId(polls_Id);
    }
    async deleteVoteById(voteId) {
        return await VoteModel.deleteVoteById(voteId);
    }

    async unvoteOption(userId, pollId, optionId) {
        return await VoteModel.unvoteOption(userId, pollId, optionId);
    }
}

export default new VoteService();