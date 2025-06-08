import PollService from "../services/poll.service.js";

class PollController {
    async createPoll(req, res) {
        try {
            const { title, author, options } = req.body;
            const newPoll = await PollService.createPoll(title, author, options);
            res.status(201).json(newPoll);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAllPolls(req, res) {
        try {
            const polls = await PollService.getAllPolls();
            res.status(200).json(polls);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getPollById(req, res) {
        try {
            const pollId = req.params.pollId;
            const poll = await PollService.getPollById(pollId);
            if (!poll) {
                return res.status(404).json({ message: "Poll not found" });
            }
            res.status(200).json(poll);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updatePoll(req, res) {
        try {
            const pollId = req.params.pollId;
            const updateData = req.body;
            const updated = await PollService.updatePoll(pollId, updateData);
            if (!updated) {
                return res.status(404).json({ message: "Poll not found" });
            }
            res.status(200).json({ message: "Poll updated successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async deletePoll(req, res) {
        try {
            const pollId = req.params.pollId;
            const deleted = await PollService.deletePoll(pollId);
            if (!deleted) {
                return res.status(404).json({ message: "Poll not found" });
            }
            res.status(200).json({ message: "Poll deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Khóa một poll (chỉ admin)
    async lockPoll(req, res) {
        try {
            const pollId = req.params.pollId;
            const locked = await PollService.lockPoll(pollId);
            if (!locked) {
                return res.status(404).json({ message: "Poll not found" });
            }
            res.status(200).json({ message: "Poll locked successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Mở khóa một poll (chỉ admin)
    async unlockPoll(req, res) {
        try {
            const pollId = req.params.pollId;
            const unlocked = await PollService.unlockPoll(pollId);
            if (!unlocked) {
                return res.status(404).json({ message: "Poll not found" });
            }
            res.status(200).json({ message: "Poll unlocked successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new PollController();