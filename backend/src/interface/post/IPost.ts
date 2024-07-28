import mongoose from "mongoose";


export interface IComment{
    user:mongoose.Schema.Types.ObjectId,
    text:string
}

export interface IPost {
    user: mongoose.Schema.Types.ObjectId,
    text?: string,
    mediaFiles?: string[],
    caption?: string
    likes?: mongoose.Schema.Types.ObjectId[],
    comments?: mongoose.Schema.Types.ObjectId[],
} 