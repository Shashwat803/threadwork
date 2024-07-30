import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError'

export interface AuthRequest extends Request {
    user: any
}

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken ||
            req.headers?.authorization?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '')
        if (!decodedUser) {
            throw new ApiError(401, "Invalid token")
        }
        (req as AuthRequest).user = decodedUser
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid token or unauthorized user")
    }
}

export default verifyJwt