
import mongoose from "mongoose";
import { IComment, IPost } from "../../interface/post/IPost";


const commentSchema = new mongoose.Schema<IComment>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text:{
        type:String,
        maxlength: [500, "Comment should not exceed 500 characters"],
        trim:true,
        required:true
    }
}, {timestamps:true})


const postSchema = new mongoose.Schema<IPost>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim:true
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    caption: {
        type: String,
        max: [200, "Caption should be max 200 character"]
    },
    likes: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
    }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true })

postSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Comment = mongoose.model("Comment", commentSchema)
const Post = mongoose.model("Post", postSchema)

export {Comment, Post}