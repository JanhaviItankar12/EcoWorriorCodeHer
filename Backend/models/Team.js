import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, 
        required: true, 
        unique: true 
    },
    members: [{
         type: mongoose.Schema.Types.ObjectId,  //players in team
        ref: "User" 
    }],
    totalScore: { 
        type: Number,  //team score (sum of players score)
        default: 0 
    }
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
