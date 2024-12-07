import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute=async(req,res,next)=>{
    try {
        //check there is token or not
        const token = req.cookies.jwt; //why we call this as a JWT it is because this is how we called it here (in lib util.js),it is the name we gives (56:00)
        if (!token) { return res.status(401).json({ message: "Unauthorized - No Token Provided" })}
        //next check it is valid or not
        //for that we need to decode the information like userId, and grab that from the cookie information
         //why is it userID, this is what we put in the toke(in util payload)

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         if (!decoded) { return res.status(401).json({ message: "Unauthorized - Invalid Token" })  }

         //find user in database
         const user = await User.findById(decoded.userId).select("-password");//-password means except password take information
         if (!user) {return res.status(404).json({ message: "User not found" });}
         
         //now user authenticated

         req.user = user;
         next()

      
    } catch (error) {
        
    }
}