import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;//userid added to req in protectedRoute
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    //the above filter saying like find all the userId except the loggedCurrent user and password,because other users need to shown in side bar

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;// the "id" means,which we give in the route to get mainly from the otheruser who sent the chat us or who we gonna send the msg
      const myId = req.user._id;// our Id
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },//if we are sending the message
          { senderId: userToChatId, receiverId: myId },//if other user( userToChatId) send msg to me(recieverId)
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }



  export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;//me
  
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();

      //now:the realTime functionality goes here ==>>socket.io
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      //if the user online send this message that user specifically
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);//send the message to client
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
