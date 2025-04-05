import jwt from 'jsonwebtoken';
import User from "../models/User.js";


//verify token
export const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied, No Token Provided" });
    }

    // Extract token (remove "Bearer ")
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied, Invalid Token Format" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Payload:", verified); //  Debugging
        req.user ={id:verified.userId}; // Ensure this contains `id`
        next(); 

    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return res.status(400).json({ message: "Invalid Token" });
    }
};

//role-basd Acess middleware
export const checkRole=(roles)=>{
    return async(req,res,next)=>{
        try {
           const user=await User.findById(req.user.id);
           
           if(!user || !roles.includes(user.role)){
             return res.status(403).json({ message: "Access Forbidden" });
           }
           next();
        } catch (error) {
            res.status(500).json({ message: "Server Error" }); 
        }
    }
}


