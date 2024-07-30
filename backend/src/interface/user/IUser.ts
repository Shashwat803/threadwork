import mongoose from "mongoose"

export interface IUser {
    username: string,
    password: string,
    refreshToken?:string
}

export interface IUserProfile {
    userId: mongoose.Schema.Types.ObjectId
    fullname: string,
    bio?: string,
    profileImage?: string,
}