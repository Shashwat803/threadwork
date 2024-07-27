import mongoose from "mongoose";
import { IUser } from "../../interface/user/IUser";

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required "],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [6, 'Must  be atleast 6, got {VALUE}']
    },
}, { timestamps: true })

export default mongoose.model("User", userSchema)