import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail=async(email,subject,message)=>{
    
    const msg={
        to:email,
        from: process.env.EMAIL_FROM, // Use your verified email
        subject: subject,
        text: message,
    };

    try {
        await sgMail.send(msg);
        console.log("Email sent Successfully");
    } catch (error) {
        console.log("Error sending email:",error.response? error.response.body:error);
    }
};

export default sendEmail;