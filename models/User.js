import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        min: 3,
        max: 20,
        unique:true
    },
    email:{
        type: String,
        required: true,
        max: 20,
        unique: true
    },
    password:{
        type:String,
        min: 5,
        required: true
    }, 
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

export default mongoose.model("User",userSchema);