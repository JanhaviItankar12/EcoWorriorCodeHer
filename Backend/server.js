import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

//routes
import authRoute from "./routes/auth.js";
import profileRoute from "./routes/profile.js";
import moderateRoute from "./routes/moderator.js";
import adminRoute from "./routes/Admin.js";
import missionRoute from "./routes/missions.js";
import teamRoute from "./routes/teams.js";
import userdetRoute from "./routes/allUser.js";

//gameRoute
import gameRoute from "./routes/Games/gameScore.js";


dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

export {io};



//middleWare
app.use(express.json());
app.use(cors());


//Socket.io connection
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    //Handle team updates
    socket.on("joinTeam", (teamId) => {
        socket.join(teamId);
        console.log(`User joined team: ${teamId}`);
        io.on(teamId).emit("teamUpdate", { message: "A new player joined!" });
    });


    //handle score updates
    socket.on("scoreUpdate", ({ teamId, score }) => {
        io.to(teamId).emit("scoreUpdate", { score });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});


//mongoDb connection
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log("Connection Error: ", error);
        process.exit(1);
    }

}

main();

//pages routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/admin", adminRoute);
app.use("/api/moderate", moderateRoute);
app.use("/api/missions", missionRoute);
app.use("/api/team", teamRoute);
app.use("/api/userDetails",userdetRoute);

//games routes
app.use("/api/game",gameRoute);


const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log("Server is running...");
});

