import mongoose from "mongoose";
import { IUser } from "../../interface/user/IUser";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required "],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [6, 'Must  be atleast 6, got {VALUE}']
    },
    refreshToken:{
        type:String
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
   return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    }, 
    process.env.ACCESS_TOKEN_SECRET || '',
  { expiresIn: '1d' })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
         id: this._id
     }, 
     process.env.REFRESH_TOKEN_SECRET || '',
   { expiresIn: '2d' })
 }
 
const User =  mongoose.model("User", userSchema)
export default User