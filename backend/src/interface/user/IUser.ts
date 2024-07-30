import mongoose from "mongoose"

export interface IUser {
    username: string,
    password: string,
    refreshToken?: string
    isPasswordCorrect(password: string): Promise<boolean>,
    generateAccessToken():string,
    generateRefreshToken():string,
}

export interface IUserProfile {
    userId: mongoose.Schema.Types.ObjectId
    fullname: string,
    bio?: string,
    profileImage?: string,
}