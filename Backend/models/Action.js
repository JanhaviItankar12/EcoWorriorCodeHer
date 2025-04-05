import mongoose from "mongoose";
import { Schema } from "mongoose";

const actionSchema=new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
         required: true
        },
        actionType: {
             type: String,
            enum: ["plant_tree", "clean_pollution", "report_issue"],
             required: true
            },
        pointsEarned: { 
            type: Number,
             default: 10 
            },
        timestamp: { 
            type: Date, 
            default: Date.now 
        }
});

export default mongoose.model("Action", actionSchema);