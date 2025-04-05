import express from "express";
import Team  from "../models/Team.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {io} from "../server.js";

const router=express.Router();

//create a team
router.post("/create",verifyToken,async(req,res)=>{
   try {
    const {name}=req.body;

    //check if the team already exists
    const existingTeam=await Team.findOne({name});
    if(existingTeam) return res.status(400).json({message:"Team name already taken!"});

    const newTeam = new Team({ name, members: [req.user.id] });
    await newTeam.save();

    //Assign the team to the user
    await User.findByIdAndUpdate(req.user.id, { team: newTeam._id });

    res.status(201).json({ message: "Team created successfully!", team: newTeam });
   } catch (error) {
      res.status(500).json({ message: "Server Error" });
   } 
});


//Join a team
router.post("/:teamId/join",verifyToken,async(req,res)=>{
    try {
        const team=await Team.findById(req.params.teamId);
        if(!team) return res.status(404).json({message:"Team not found!"});

        const user=await User.findById(req.user.id);
        if(user.team) return res.status(400).json({message: "You are already in a team!"});

        // Add user to team
        team.members.push(req.user.id);
        await team.save();
        
        //update user's team
        user.team = team._id;
        await user.save();

        //emit event for real-time team update
        io.to(team._id.toString()).emit("teamUpdate",{message:`${user.username} joined the team!`});

        res.json({ message: "Joined team successfully!", team });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


// 🎯 Get all teams
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find().populate("members", "username score");
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🎯 Leave a team
router.post("/leave", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.team) return res.status(400).json({ message: "You are not in any team!" });

        const team = await Team.findById(user.team);
        if (!team) return res.status(404).json({ message: "Team not found!" });

        // Remove user from team
        team.members = team.members.filter(member => member.toString() !== req.user.id);
        await team.save();

        // Remove team from user
        user.team = null;
        await user.save();

        res.json({ message: "You have left the team!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;




