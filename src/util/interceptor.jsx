import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.admin.kapitiano.com/",
});

// ✅ Request Interceptor with token and conditional headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Only set application/json if NOT sending FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    console.log("Interceptor Error:", error);

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      // window.location.href = "/admin-dashboard/login"; 

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
