import axios from "axios"
const BASE_URL = "http://localhost:3000/api"


export const mainAxios = axios.create({
    baseURL: BASE_URL
})

mainAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers = config.headers || {}
        // If your API expects just the token (not Bearer), change accordingly
        config.headers['Authorization'] = token
    }
    return config
})

