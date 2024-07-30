import express from "express"
import { createComment, createPost, deletePost, getAllPost, usersPost } from "../controllers/postController"
import upload from "../middleware/multer"
import verifyJwt from "../middleware/authMiddleware"
const router = express.Router()


router.post('/post', upload.array("mediaFiles", 5), verifyJwt, createPost)
router.delete('/post/:id', verifyJwt, deletePost)
router.get('/post', verifyJwt, getAllPost)
router.get('/post/profile', verifyJwt, usersPost)
router.get('/post/comment/:id', verifyJwt, createComment)

export default router