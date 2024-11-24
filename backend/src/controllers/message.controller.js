import cloudinary from "../lib/cloudinary.js";
import message from "../models/message.models.js";
import User from "../models/user.models.js"
import {io ,getReceiverSocketId} from "../lib/socket.js"


export const getUsersForSidebar = async(req,res)=>{
    try {

        const loggedInUserId = req.user._id;
        const filtredUsers  = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(filtredUsers)  
    } catch (error) {
        console.log("error in getUsersForSidebar", error.message);
        return res.status(500).json({message:"internal server error"});
        
    }
}


export const  getmessages = async (req,res)=>{
    try {

        const {id:userToChatId}  = req.params;
        const myId = req.user._id

        const messages = await message.find({
           $or:[
            {senderid:myId , receiverid:userToChatId},
            {senderid:userToChatId , receiverid:myId}
           ] 
        })
       return res.status(200).json(messages)
        
    } catch (error) {
        console.log("error in getmessages controller", error.message);
        return res.status(500).json({message:"internal server error"});
        
    }

}


export const sendmessage = async(req,res)=>{
    try {
        const {text , image} = req.body;
        const {id:receiverid} = req.params;

        const senderid = req.user._id;


        let imgurl;

        if(image){
            const uploadresponse = await cloudinary.uploader.upload(image);
            imgurl = uploadresponse.secure_url;
        }

        const newmessage = new message({
            senderid:senderid,
            receiverid:receiverid,
            text:text,
            image:imgurl,
        })
        await newmessage.save()

        //todo: real time functionality goes here => socket.io
        const  receiverSocketId = getReceiverSocketId(receiverid)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newmessage)
        }

        return res.status(201).json(newmessage)   
    } catch (error) {
        console.log("error in sendmessage controller", error.message);  
    }
}