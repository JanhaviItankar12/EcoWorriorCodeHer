import express from "express";
import Mission from "../models/Mission.js";
import {verifyToken} from "../middleware/verifyToken.js";
import User from "../models/User.js";
import { io } from "../server.js";
import Team from "../models/Team.js";

const router = express.Router();

//create new mission
router.post("/",verifyToken,async(req,res)=>{
    try {
        const {title,description,rewardPoints,location}=req.body;
        const newMission=new Mission({
            title, description, rewardPoints, location 
        });
        newMission.save();
        res.status(201).json(newMission);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


//player completes a mission (real time score update)
router.post("/:missionId/complete",verifyToken,async(req,res)=>{
    try {
        const mission=await Mission.findById(req.params.missionId);
        if(!mission){
            return res.status(404).json({message:"Mission not found"});
        }


        // Prevent duplicate mission completion
        if(!mission.completedBy.includes(req.user.id)){
            return res.json({ message: "You already completed this mission!" });
        }
            //add user to mission complete list
            mission.completedBy.push(req.user.id);
            await mission.save();

            //update players score
            const user=await User.findById(req.user.id);
            user.score+=mission.rewardPoints;
            await user.save();

            // Update team score if user is in a team
            if (user.team) {
            const team = await Team.findById(user.team);
            team.totalScore += mission.rewardPoints;
            await team.save();

             //emit real-time score updates
             io.to(team._id.toString()).emit("scoreUpdate",{score:team.totalScore});

            }
             res.json({ message: "Mission completed!", newScore: user.score });
        
        } catch (error) {
        res.status(500).json({ message: "Server Error" }); 
    }
});


//Get all availlable missions
router.get("/",async(req,res)=>{
    try {
        const missions=await Mission.findById();
        res.json(missions);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;