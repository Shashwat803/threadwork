import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
    cloud_name: "dw4axo8qp",
    api_key: "137745325196666",
    api_secret: "5-jJFJUyrx4orr0HKEb7n6zduiU"
});

const cloudinaryUpload = async (filePath: string) => {
    try {
        if (!filePath) return null
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })
        console.log("file uploaded successfully", uploadResult)
        fs.unlinkSync(filePath)
        return uploadResult.url
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error)
        return null
    }
}

export default cloudinaryUpload