import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Profile from "../models/user/UserProfile.model";
import ApiError from "../utils/ApiError";
import cloudinaryUpload from "../utils/CloudinaryFileUpload";

// need to add user id
const createProfile = asyncHandler(async (req: Request, res: Response) => {
    const { fullname, bio } = req.body
    const profileImage = req.file as Express.Multer.File

    if (!fullname && !bio) {
        throw new ApiError(400, "All fields are required")
    }
    if (!profileImage || !profileImage.path) {
        throw new ApiError(400, "Profile image is required");
    }
    const uploadedProfileImage = await cloudinaryUpload(profileImage.path)
    const profile = await Profile.create({
        fullname,
        bio,
        profileImage: uploadedProfileImage
    })
    return res.status(201).json(profile)
})

export { createProfile }