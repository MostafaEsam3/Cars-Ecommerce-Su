// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.admin.kapitiano.com/",
});

// ✅ Request Interceptor with token and headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Or sessionStorage, depending on where you store it

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers["Content-Type"] = "application/json"; // Set default content type

        console.log("Request Interceptor:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response Interceptor:", response);
        return response;
    },
    (error) => {
        console.log("Interceptor Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
