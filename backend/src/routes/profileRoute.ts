import express from "express"
import { createProfile } from "../controllers/profileController"
import upload from "../middleware/multer"
const router = express.Router()


router.post('/profile', upload.single("profileImage"), createProfile)


export default router