import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user/User.model";
import ApiError from "../utils/ApiError";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    //body, validation, creation
    const { username, password } = req.body
    if (!username && !password) {
        throw new ApiError(400, "Username & Password is required")
    }
    const user = await User.create({
        username: username.toLowerCase(),
        password
    })
    const userCreated = await User.findById({ _id: user._id }).select("username")

    if (!userCreated) throw new ApiError(400, "Something went wrong while creating a user")

    res.status(201).json({
        data: userCreated,
        success: true,
        message: "User created successfully"
    })
})

export { registerUser }