import express from "express"
import { createProfile, getOwnerProfile } from "../controllers/profileController"
import upload from "../middleware/multer"
const router = express.Router()


router.post('/profile', upload.single("profileImage"), createProfile)
router.get('/profile', getOwnerProfile)


export default router