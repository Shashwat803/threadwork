import mongoose from "mongoose"

export interface IUser {
    username: string,
    email: string,
    password: string,
}

export interface IUserProfile {
    userId: mongoose.Schema.Types.ObjectId
    fullname: string,
    bio?: string
    avatar?: string
}