import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController"
import verifyJwt from "../middleware/authMiddleware"

const router = express.Router()


router.post("/signup", registerUser)
router.post("/login", loginUser)
router.post("/logout", verifyJwt ,logoutUser)

export default router