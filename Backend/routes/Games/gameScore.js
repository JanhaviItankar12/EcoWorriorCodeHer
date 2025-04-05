import express, { Router } from "express";
import User from "../../models/User.js";
const router=Router();

// POST /api/save-score
router.post("/save-score", async (req, res) => {
  const { userId, score, game } = req.body;
  console.log(req.body);


  try {
    const user=await User.findByIdAndUpdate(userId, { 
      score: score, 
      game: game 
    }, { new: true });

   

    res.status(200).json({ message: "Score and game updated successfully" });
  } catch (err) {
    console.error("Save Score Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
  