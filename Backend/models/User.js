import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken: { 
        type: String 
    },
    resetPasswordExpires: { 
        type: Date 
    },
    avatar: { 
        type: String,
         default: ""
     },
    bio:{  
        type:String,
        default:"Ecoworrior in training!"
    },
    score:{
        type:Number,
        default: 0
    },
    role: {   //for role
         type: String, 
         enum: ["player", "moderator"], 
         default: "player"
    },
    game:{
        type:String,
        default:""
    },
    team: {
         type: mongoose.Schema.Types.ObjectId,  //optional team
         ref: "Team" 
        } 


},
{timestamps:true});

export default mongoose.model("User",UserSchema);