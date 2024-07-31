import express from "express"
import { createComment, createLike, createPost, deleteComment, deleteLike, deletePost, getAllPost, usersPost } from "../controllers/postController"
import upload from "../middleware/multer"
import verifyJwt from "../middleware/authMiddleware"
const router = express.Router()


router.post('/post', upload.array("mediaFiles", 5), verifyJwt, createPost)
router.delete('/post/:id', verifyJwt, deletePost)
router.get('/post', verifyJwt, getAllPost)
router.get('/post/profile', verifyJwt, usersPost)
router.post('/post/comment/:postId', verifyJwt, createComment)
router.delete('/post/:postId/:commentId', verifyJwt, deleteComment)
router.post('/post/like/:id', verifyJwt, createLike )
router.put('/post/like/:id', verifyJwt, deleteLike )

export default router