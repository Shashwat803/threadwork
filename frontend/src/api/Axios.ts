import axios from "axios";

const baseUrl = 'http://localhost:5000/api/v1'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle global errors (e.g., 401 Unauthorized)
      if (error.response && error.response.status === 401) {
        // Redirect to login or refresh token
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;