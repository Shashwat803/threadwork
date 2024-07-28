import mongoose from "mongoose";
import {IUserProfile} from '../../interface/user/IUser'

const userProfileSchema = new mongoose.Schema<IUserProfile>({
    userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
    //  required:'true'
    },
    fullname: {
        type: String,
        required: [true, "Full name is required"]
    },
    bio:{
        type:String,
    },
    profileImage:{
        type:String
    }
},{timestamps:true})

const Profile = mongoose.model("UserProfile", userProfileSchema)
export default Profile