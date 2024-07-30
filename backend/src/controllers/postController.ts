import { Request, Response } from "express";
import { Post } from "../models/post/Post.model";
import cloudinaryUpload from "../utils/cloudinaryFileUpload";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";


//need to add user id 

const createPost = asyncHandler(async (req: Request, res: Response) => {
    const uploadedFiles: string[] = []
    const { text, caption } = req.body
    const mediaFiles = req.files as Express.Multer.File[];

    if (!text && !mediaFiles || !Array.isArray(mediaFiles) || mediaFiles.length === 0) {
        throw new ApiError(400, "Content not found");
    }

    const uploadPromises = mediaFiles.map(async (file) => {
        const link = await cloudinaryUpload(file.path)
        if (link === null) {
            throw new Error(`Failed to upload file: ${file.originalname}`);
        }
        uploadedFiles.push(link)
    })

    await Promise.all(uploadPromises)

    const post = await Post.create({
        text: text || '',
        mediaFiles: uploadedFiles,
        caption: caption || ''
    })

    return res.status(201).json({
        data:post,
        success:true,
        message:"Post created successfully"
      })

})
const getAllPost = asyncHandler(async (req: Request, res: Response) => {
    const allPosts = await Post.find().select("text imagesOrVideos likes comments createdAt likeCount commentCount")
    return res.status(201).json({
        data:allPosts,
        success:true,
        message:"Posts fetched successfully"
      })
})

const usersPost = asyncHandler(async (req: Request, res: Response) => {
       // req.User_id
        const allPosts = await Post.find({}).select("text imagesOrVideos likes comments createdAt likeCount commentCount")
        res.status(200).json(allPosts)
   
})

export { createPost, getAllPost }