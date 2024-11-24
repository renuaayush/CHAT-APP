import mongoose, { mongo } from "mongoose";


const userschema = mongoose.Schema(
    {
        email :{
            type :String,
            require : true,
            unique : true,
        },
        fullname :{
            type : String ,
            require : true,
        },
        password:{
            type :String,
            require : true,
            minlength : 6,
        },
        profilepic:{
            type:String,
            default:"",
        },
    },
    {timestamps:true}
);

const User = mongoose.model("User", userschema);

// even if we give User it create a model as  users

export default User;