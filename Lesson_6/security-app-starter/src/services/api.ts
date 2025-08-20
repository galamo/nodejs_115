import axios from 'axios'

// Base axios instance with baseURL + auth header from localStorage
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 20000
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    // If your API expects just the token (not Bearer), change accordingly
    config.headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    // Normalize common error message
    const msg = error?.response?.data?.message || error?.message || 'Request failed'
    return Promise.reject(new Error(msg))
  }
)

export default api
