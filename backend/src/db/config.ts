import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://shashwat:YB7zbOp8ti6KxPOL@cluster0.3e5gxvk.mongodb.net/")
            .then(() => {
                console.log("Database connected")
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
}

export default connectDb