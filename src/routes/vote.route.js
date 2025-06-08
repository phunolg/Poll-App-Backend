import express from "express";
import VoteController from "../controllers/vote.controller.js";
import verifyMiddleware from "../middleware/verify.middleware.js";
import { requireAdmin, requireUserOrAdmin } from "../middleware/role.middleware.js";

const router = express.Router();
router.post("/create", verifyMiddleware.checkAuth, requireUserOrAdmin, VoteController.createVote);

// Lấy tất cả votes theo poll ID
router.get("/poll/:pollId", VoteController.getVotesByPollId);

// Lấy tất cả votes theo user ID
router.get("/user/:userId", VoteController.getVotesByUserId);

// Xóa tất cả votes theo poll ID (chỉ admin)
router.delete("/poll/:pollId", verifyMiddleware.checkAuth, requireAdmin, VoteController.deleteVotesByPollId);

// Hủy một lựa chọn vote cụ thể của người dùng trong một poll
router.delete("/unvote", verifyMiddleware.checkAuth, requireUserOrAdmin, VoteController.unvoteOption);

// Xóa một vote theo vote ID (chỉ admin)
router.delete("/:voteId", verifyMiddleware.checkAuth, requireAdmin, VoteController.deleteVoteById);

export default router;