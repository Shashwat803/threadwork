import express from "express"
import { createPost, getAllPost } from "../controllers/postController"
import upload from "../middleware/multer"
const router = express.Router()


router.post('/post', upload.array("mediaFiles", 5), createPost)
router.get('/post', getAllPost)

export default router