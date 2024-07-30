import express from "express"
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/authController"
import verifyJwt from "../middleware/authMiddleware"

const router = express.Router()


router.post("/signup", registerUser)
router.post("/login", loginUser)
router.post("/logout", verifyJwt, logoutUser)
router.post("/refreshToken", verifyJwt, refreshAccessToken)

export default router