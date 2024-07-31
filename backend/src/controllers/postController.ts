import { Request, Response } from "express";
import { Comment, Post } from "../models/post/Post.model";
import cloudinaryUpload from "../utils/cloudinaryFileUpload";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../interface/auth/IAuth";


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
        user: (req as AuthRequest).user.id,
        text: text || '',
        mediaFiles: uploadedFiles,
        caption: caption || ''
    })

    return res.status(201).json({
        data: post,
        success: true,
        message: "Post created successfully"
    })

})

const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.id
    await Post.deleteOne({ _id: postId })
    return res.status(200).json({
        success: true,
        message: "Post deleted"
    })
})

const getAllPost = asyncHandler(async (req: Request, res: Response) => {
    const allPosts = await Post.find().select("text imagesOrVideos likes comments createdAt likeCount commentCount")
    .populate({
        path:'comments',
        select:'-user -createdAt -updatedAt'
    })
    return res.status(200).json({
        data: allPosts,
        success: true,
        message: "Posts fetched successfully"
    })
})

const usersPost = asyncHandler(async (req: Request, res: Response) => {
    const allPosts = await Post.find({ _id: (req as AuthRequest).user.id }).select("text imagesOrVideos likes comments createdAt likeCount commentCount")
    return res.status(200).json({
        data: allPosts,
        success: true,
        message: "Posts fetched successfully"
    })
})

const createComment = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.postId
    const { comment } = req.body
    if (!comment) {
        throw new ApiError(400, "Comment empty")
    }
    const post = await Post.findById({ _id: postId })
    if (!post) {
        throw new ApiError(400, "Post not found")
    }
    const commentBody = new Comment({
        user: (req as AuthRequest).user.id,
        text: comment
    })
    if (!commentBody) {
        throw new ApiError(401, "Error while creating comment")
    }
    await commentBody.save()
    const updatedPost = await Post.findByIdAndUpdate(postId, {
        $push: { comments: commentBody._id }
    }, { new: true }).populate({
        path: 'comments',
        select:'-user -createdAt -updatedAt',
    });
    res.status(201).json({
        data: updatedPost,
        success: true,
        message: "comment added"
    })
})

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user.id
    const postId = req.params.postId
    const commentId = req.params.commentId
    const deletedComment = await Comment.deleteOne({ user: userId })
    if (!deletedComment) {
        throw new ApiError(400, "comment and post author can delete the comment")
    }
    const post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: commentId }
    })
    if (!post) {
        throw new ApiError(400, "Something went wrong while deleting a comment")
    }
    return res.status(200).json({
        success: true,
        message: "comment deleted"
    })
})

const createLike = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.id
    const userId = (req as AuthRequest).user.id
    const post = await Post.findByIdAndUpdate(postId, {
        $push: { likes: userId }
    }, { new: true })
    if (!post) {
        throw new ApiError(400, "Error while liking a post")
    }
    return res.status(201).json({
        success: true,
    })
})

const deleteLike = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.id
    const userId = (req as AuthRequest).user.id
    const post = await Post.findByIdAndUpdate(postId, {
        $pull: { likes: userId }
    }, { new: true })
    if (!post) {
        throw new ApiError(400, "Error while liking a post")
    }
    return res.status(200).json({
        success: true,
    })
})




export { createPost, deletePost, getAllPost, usersPost, createComment, deleteComment, createLike, deleteLike }