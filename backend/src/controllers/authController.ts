import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user/User.model";
import ApiError from "../utils/ApiError";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/authMiddleware";


const httpOption = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshToken = async (id: mongoose.Types.ObjectId) => {
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(400, "Error while generating tokens")
    }
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return {
        accessToken, refreshToken
    }
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    //body, validation, creation
    const { username, password } = req.body
    if (!username && !password) {
        throw new ApiError(400, "Username & Password is required")
    }

    const userExist = await User.findOne({ username })

    if (!userExist) {
        throw new ApiError(400, "User already exist")
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

// body,- validation, find user - validation , - password check , - generate tokens (save in db) - send cookie

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username && !password) {
        throw new ApiError(400, "Username & Password is required")
    }
    const user = await User.findOne({ username: username.toLowerCase() })
    if (!user) {
        throw new ApiError(401, "User not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Username or Password is wrong")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const httpOption = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, httpOption)
        .cookie("refreshToken", refreshToken, httpOption)
        .json({
            data: accessToken,
            success: true,
            message: "User logged in successfully"
        })

})

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user.id
    await User.findByIdAndUpdate(userId, {
        $set: { refreshToken: undefined },
    }, {
        new: true
    })
    res.status(200).clearCookie("accessToken", httpOption)
        .clearCookie("refreshToken", httpOption).
        json({
            success: true,
            message: "logout successfully"

        })
})
export { registerUser, loginUser, logoutUser }