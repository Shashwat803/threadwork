/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./Axios";

interface Auth {
    username: string,
    password: string
}

interface Post {
    text: string;
    media: any[];
}


export const loginUser = async (loginFormData: Auth) => {
    try {
        const response = await axiosInstance.post('/login', loginFormData)
        return response
    } catch (error) {
        throw new Error()
    }
}

export const fetchAllPosts = async () => {
    try {
        const response = await axiosInstance.get('/post')
        return response
    } catch (error) {
        throw new Error()
    }
}

export const uploadPost = async (formData: Post) => {
    try {
        const response = await axiosInstance.post('/post', formData)
        return response
    } catch (error) {
        throw new Error()
    }
}