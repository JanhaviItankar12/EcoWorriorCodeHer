import express from "express";
import User from "../models/User.js";


const router=express.Router();

router.get("/allUser",async (req,res) => {
    try {
        const users = await User.find({}, "name email score"); // Fetch selected fields for efficiency
        if (!users.length) {
          return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error); // Logs error for debugging
        res.status(500).json({ message: "Server error fetching users" });
      }
})



export default router;