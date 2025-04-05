import express from 'express';
import User from '../models/User.js';
import {verifyToken} from "../middleware/verifyToken.js";
import multer from "multer";

const router=express.Router();

//configure multer for image uploads
const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
});

const upload=multer({storage});

//get-user profile
router.get("/:userId",async(req,res)=>{
    try {
        const user=await User.findById(req.params.userId).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});
        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//Update User Profile(Bio,Avatar)
router.put("/edit/:userId",verifyToken,async(req,res)=>{
    try {
        const {name,email,bio}=req.body;

        if(!req.user || !req.user.id){
            return res.status(401).json({ message: "Unauthorized, token invalid" });
        }
        const updateUser=await User.findByIdAndUpdate(
            req.user.id,
            {name,email,bio},
            {new:true}
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updateUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
});

//upload profile picture
router.put("/upload-avatar",verifyToken,upload.single("avatar"),async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(
            req.user.id,
            {avatar:`/uploads/${req.file.filename}`},
            {new:true}
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error uploading avatar" });
    }
})

//fetch leaderboard(top 10 players)
router.get("/leaderboard",async(req,res)=>{

    console.log("Fetching leaderboard...");

    try {
        const topPlayers=await User.find()
        .sort({score:-1})   //sort by highest score
        .limit(10)
        .select("name score avatar");

        console.log(" Players found:", topPlayers);

        if (!topPlayers || topPlayers.length === 0) {
            return res.status(404).json({ message: "No players found" });
        }

      res.json(topPlayers);
    } catch (error) {
        console.error("Leaderboard Fetch Error:", error.stack);
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
});

export default router;

