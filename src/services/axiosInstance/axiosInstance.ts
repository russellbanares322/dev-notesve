import axios from "axios";

// VITE_APP_BASE_URL
// VITE_APP_BASE_URL_DEV
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
})

export { axiosInstance as api }