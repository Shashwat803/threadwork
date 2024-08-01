import axiosInstance from "./Axios";


export const fetchAllPosts = async () => {
    try {
        const response = await axiosInstance.get('/post')
        return response
    } catch (error) {
        throw new Error()
    }
}