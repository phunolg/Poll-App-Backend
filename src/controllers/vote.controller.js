import VoteService from "../services/vote.service.js";

class VoteController {
    // Tạo một vote mới
    async createVote(req, res) {
        try {
            const { userId, polls_Id, Selectedoptions } = req.body;

            if (!userId || !polls_Id || !Selectedoptions || Selectedoptions.length === 0) {
                return res.status(400).json({ message: "Invalid input data" });
            }

            const newVote = await VoteService.createVote(userId, polls_Id, Selectedoptions);

            res.status(201).json({ message: "Vote created successfully", vote: newVote });
        } catch (err) {
            // Kiểm tra xem lỗi có phải là do người dùng đã vote rồi không
            if (err.message.startsWith("User has already voted for option")) {
                res.status(409).json({ message: err.message });
            } else if (err.message.includes("is currently locked")) {
                // Bắt lỗi poll đã bị khóa
                res.status(403).json({ message: err.message });
            } else if (err.message.includes("does not match any valid option in poll") || err.message.startsWith("Poll with ID")) {
                // Bắt lỗi option không hợp lệ hoặc poll không tìm thấy
                res.status(400).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        }
    }

    // Lấy tất cả votes theo poll ID
    async getVotesByPollId(req, res) {
        try {
            const { pollId } = req.params;

            const votes = await VoteService.getVotesByPollId(pollId);

            res.status(200).json(votes);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Lấy tất cả votes theo user ID
    async getVotesByUserId(req, res) {
        try {
            const { userId } = req.params;

            const votes = await VoteService.getVotesByUserId(userId);

            res.status(200).json(votes);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Xóa tất cả votes theo poll ID
    async deleteVotesByPollId(req, res) {
        try {
            const { pollId } = req.params;

            const deleted = await VoteService.deleteVotesByPollId(pollId);

            if (!deleted) {
                return res.status(404).json({ message: "No votes found for this poll" });
            }

            res.status(200).json({ message: "Votes deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Xóa một vote theo vote ID
    async deleteVoteById(req, res) {
        try {
            const { voteId } = req.params;

            if (!voteId) {
                return res.status(400).json({ message: "Vote ID is required" });
            }

            const deleted = await VoteService.deleteVoteById(voteId);

            if (!deleted) {
                return res.status(404).json({ message: "Vote not found or already deleted" });
            }

            res.status(200).json({ message: "Vote deleted successfully" });
        } catch (err) {
            if (err.name === 'BSONTypeError' || (err.message && err.message.includes("Argument passed in must be a string of 12 bytes or a string of 24 hex characters"))) {
                return res.status(400).json({ message: "Invalid Vote ID format" });
            }
            res.status(500).json({ message: err.message });
        }
    }

     // Hủy một lựa chọn vote cụ thể của người dùng trong một poll
    async unvoteOption(req, res) {
        console.log("[VoteController.unvoteOption] called", req.body);
        try {
            const { userId, pollId, optionId } = req.body;

            if (!userId || !pollId || !optionId) {
                return res.status(400).json({ message: "User ID, Poll ID, and Option ID are required." });
            }

            const unvoted = await VoteService.unvoteOption(userId, pollId, optionId);

            if (!unvoted) {
                return res.status(404).json({ message: "Vote not found for this user, poll, and option, or already unvoted." });
            }

            res.status(200).json({ message: "Successfully unvoted the option." });
        } catch (err) {
            if (err.message && err.message.includes("is currently locked")) {
                // Bắt lỗi poll đã bị khóa
                return res.status(403).json({ message: err.message });
            } else if (err.name === 'BSONTypeError' || (err.message && err.message.includes("Argument passed in must be a string of 12 bytes or a string of 24 hex characters"))) {
                return res.status(400).json({ message: "Invalid ID format for User, Poll, or Option." });
            }
            res.status(500).json({ message: err.message });
        }
    }

}

export default new VoteController();