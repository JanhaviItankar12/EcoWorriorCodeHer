import express from "express";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";

const router = express.Router();

//  Moderator Only: Approve Game Challenges
router.put("/approve-challenge/:challengeId", verifyToken, checkRole(["moderator", "admin"]), async (req, res) => {
    try {
        // Logic to approve a challenge (set status = approved)
        res.json({ message: "Challenge approved!" });
    } catch (error) {
        res.status(500).json({ message: "Error approving challenge" });
    }
});

export default router;