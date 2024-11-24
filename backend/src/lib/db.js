import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectdb = async ()=>{
    try {
       const conn=  await mongoose.connect(process.env.MONGO_URI)
       console.log(`Mongo db connected ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Mongodb connection error ${error}`)
        
    }
} 

export default connectdb