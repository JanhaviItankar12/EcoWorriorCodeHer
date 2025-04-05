import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
       
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
