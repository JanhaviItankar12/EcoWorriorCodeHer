import express from "express" ;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {body,validationResult} from "express-validator";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const router=express.Router();

//sighup
router.post("/signup",[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 Characters")
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

    try {
        console.log(req.body);
        const {name,email,password}=req.body;

        let user=await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exists"});

        const hashedPassword=await bcrypt.hash(password,10);
        user=new User({name,email,password:hashedPassword});

        await user.save();
        res.status(201).json({message:"User registered successfully",userId: user._id,});
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}
);

//login
router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
    body("role").notEmpty().withMessage("Role is required")
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    console.log(req.body);
    const { email, password, role } = req.body;
  
    try {
      let account;
  
      if (role === "admin") {
        account = await Admin.findOne({ email });
      } else {
        account = await User.findOne({ email });
      }
  
      if (!account) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: account._id, role }, process.env.JWT_SECRET, { expiresIn: "24h" });
  
      res.json({
        token,
        user: {
          id: account._id,
          name: account.name,
          email: account.email,
          role
        }
      });
  
    } catch (error) {
      console.error("error:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  

//forgot password
router.post("/forgot-password",async(req,res)=>{
    try {
       const {email} =req.body;
       const user=await User.findOne({email});

       if(!user) return res.status(404).json({message:"User not found"});

       //genrate reset token
       const resetToken=crypto.randomBytes(32).toString("hex");
       user.resetPasswordToken=resetToken;
       user.resetPasswordExpires=Date.now()+3600000   //1 hr


       await user.save({validateBeforeSave:false});

       //send email
       const resetUrl=`${process.env.Frontend_Url}/reset-password/${resetToken}`;
       const message=`Lost in the jungle of forgotten passwords? 🌿 No worries! Click here to reset and get back to saving the planet:${resetUrl}`;
       await sendEmail(user.email,"Password Reset",message);

       res.json({message:"Password reset link sent to your email" ,token:resetToken});
    } catch (error) {
        console.log(error);
       res.status(500).json({message:"Server Error",error:error.message}); 
    }
});

//reset-password-update password
router.post("/reset-password/:token",async(req,res)=>{
    try {
        const {token}=req.params;
        const {password}=req.body;

        console.log("token:",token);

        const user=await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()}
        });

        if(!user) return res.status(400).json({message:"Invalid or expired token"});

        //hash new password
        user.password=await bcrypt.hash(password,10);
        user.resetPasswordToken=undefined;
        user.resetPasswordExpires=undefined;
        await user.save();

        res.json({message:"Password reset successful"});
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
});



export default router;
