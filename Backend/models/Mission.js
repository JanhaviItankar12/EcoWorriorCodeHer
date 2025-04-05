import mongoose from "mongoose";
import { Schema } from "mongoose";

const missionSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rewardPoints:{
        type:Number,
        default:50  //Points earned on completion
    },
    location:{
        type:String   //Optional real world location
    },
    completedBy: [{
         type: mongoose.Schema.Types.ObjectId,
          ref: "User" 
    }] // Players who finished it
},
{ timestamps: true }
);


export default mongoose.model("Mission", missionSchema);