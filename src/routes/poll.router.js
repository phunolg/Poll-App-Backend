import express from "express";
import PollController from "../controllers/poll.controller.js";
import verifyMiddleware from "../middleware/verify.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// Tạo poll
router.post("/create", verifyMiddleware.checkAuth, requireAdmin, PollController.createPoll);

// Lấy tất cả polls
router.get("/", PollController.getAllPolls);

// Lấy một poll theo ID
router.get("/:pollId", PollController.getPollById);

// Cập nhật một poll (chỉ admin)
router.put("/:pollId", verifyMiddleware.checkAuth, requireAdmin, PollController.updatePoll);

// Xóa một poll (chỉ admin)
router.delete("/:pollId", verifyMiddleware.checkAuth, requireAdmin, PollController.deletePoll);

// Khóa một poll (chỉ admin)
router.put("/:pollId/lock", verifyMiddleware.checkAuth, requireAdmin, PollController.lockPoll);

// Mở khóa một poll (chỉ admin)
router.put("/:pollId/unlock", verifyMiddleware.checkAuth, requireAdmin, PollController.unlockPoll);

export default router;