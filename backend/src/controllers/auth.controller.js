import bcrypt from "bcryptjs"
import User from "../models/user.models.js"
import { generatetoken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"



export const signup = async(req,res)=>{
    const {email,fullname,password} = req.body
    try {


        if(!fullname || !password || ! email){
           return res.status(400).json({message:"provide full details"})
        }
        
        if(password.length <6){
            return res.status(400).json({message:"password must be 6 characters"})
        }   

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exist"})
        }
        // hash passwords

        const salt = await bcrypt.genSalt(10)
        const hashedpasssword = await bcrypt.hash(password,salt)


        const newuser = new User({
            fullname:fullname,
            password:hashedpasssword,
            email:email
        })
    

        if(newuser){
            generatetoken(newuser._id,res)
            await newuser.save();

            res.status(201).json({
                id:newuser._id,
                fullname:newuser.fullname,
                email:newuser.email,
                profilepic:newuser.profilepic,


            })// 201 means somethinfg has created
            

        }else{
            res.status(400).json({messaage:"Invalid user data"})
        }



    } catch (error) {
        console.log(`error in signup controller ${error.message}`)
        res.status(500).json({message:"internal server error"});
        
    }
}

export const  login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user){
           return  res.status(400).json({message:"invalid crediantials"})
        }
        
        const ispasswordcorrect = await bcrypt.compare(password , user.password)
        if(!ispasswordcorrect){
            return res.status(400).json({message:"invalid crediantials"})

        }

        generatetoken(user._id , res)

        return res.status(201).json({
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilepic:user.profilepic,


        })

        
    } catch (error) {

        console.log("error in login controller " , error.message)
        return res.status(500).json({message:"internal server error"})
        
    }
    
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt" , "" ,{maxAge: 0})
        return res.status(200).json({message:"logout successful"})
        
    } catch (error) {
        console.log("error in logout controller",error.messaage)
        return res.status(500).json({message:"internal server error"})
    }
    
}

export const updateprofile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilepic: uploadResponse.secure_url
        }, { new: true });

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error in updating profile:", error.message);  // More detailed logging
        return res.status(500).json({ message: "Internal server error" });
    }
}



// export const updateprofile = async(req,res)=>{
//         try {
//             const {profilepic} = req.body;
//             const userid = req.user._id

//             if(!profilepic){
//                 return res.status(400).json({message:"profile pic required"})

//             }

//            const uploadresponse =  await cloudinary.uploader.upload(profilepic)
//             const updateduser = await User.findByIdAndUpdate(userid,{profilepic:uploadresponse.secure_url},{new:true})

//             res.status(200).json(updateduser)

            
//         } catch (error) {
//             console.log("error in update profile" , error)
//             return res.status(500).json({message:"internal server error"})
            
//         }
// }

export const checkauth = (req,res)=>{
    try {
        res.status(200).json(req.user)
        
    } catch (error) {
        console.log("error in checkauth controller" , error.message)
        res.status(500).json({message:"internal server error"})
        
    }
}