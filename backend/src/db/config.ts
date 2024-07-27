import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MongodbURI as string)
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