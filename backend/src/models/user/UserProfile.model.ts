import mongoose from "mongoose";
import {IUserProfile} from '../../interface/user/IUser'

const userProfileSchema = new mongoose.Schema<IUserProfile>({
    userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:'true'
    },
    fullname: {
        type: String,
        required: [true, "Full name is required"]
    },
    bio:{
        type:String,
    },
    avatar:{
        type:String
    }
},{timestamps:true})

export default mongoose.model("UserProfile", userProfileSchema)