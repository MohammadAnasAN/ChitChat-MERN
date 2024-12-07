import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/database.js"
import { app, server } from "./lib/socket.js";

import path from "path";


dotenv.config()
// const app=express(); because we are using in socket.js

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );//allow the cookie or autherization headers to be send with the request

const PORT=process.env.PORT
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT,()=>{
    console.log(`server is running on the port: ${PORT}`)
    connectDB()
})