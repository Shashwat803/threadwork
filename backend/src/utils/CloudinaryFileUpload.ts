import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const cloudinaryUpload = async (filePath: string) => {
    try {
        if (!filePath) return null
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })
        console.log("file uploaded successfully", uploadResult)
        return uploadResult.url
    } catch (error) {
        fs.unlinkSync(filePath)
        return null
    }
}

export default cloudinaryUpload