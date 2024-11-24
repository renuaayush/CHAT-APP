import mongoose from "mongoose"

const messageschema = new mongoose.Schema({
    senderid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    receiverid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },

    text:{
        type:String,
    },
    image:{
        type:String,
    }
},
{timestamps:true})


const message = mongoose.model("message", messageschema);

export default message