// api.js
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  role?: string;
}

const Api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig;
    const role = customConfig.role || "user";

    let token;
    switch (role) {
      case "user":
        token = localStorage.getItem("accessToken");
        break;
      case "admin":
        token = localStorage.getItem("adminAccessToken");
        break;
      case "tutor":
        token = localStorage.getItem("tutorAccessToken");
        break;
      default:
        token = localStorage.getItem("accessToken");
    }

    if (token) {
      if (!customConfig.headers) {
        customConfig.headers = {} as AxiosRequestHeaders; // Ensure headers object exists with correct type
      }
      customConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    return customConfig;
  },
  (error: any) => {
    return Promise.reject(error); // Adjusted to match the expected number of arguments
  }
);

Api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.newAccessToken) {
      localStorage.setItem("accessToken", response.data.newAccessToken);
    }
    return response;
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          if (response.data?.message === "Profile is blocked") {
            window.location.href = "/login";
            toast.error("Your profile is blocked. Please contact support.");
          } else {
            localStorage.removeItem("accessToken");
          }
          break;
        case 404:
          window.location.href = "/error404";
          break;
        case 500:
          window.location.href = "/error500";
          break;
        default:
          toast.error("An error occurred. Please try again later.");
          break;
      }
    } else {
      toast.error("Network error. Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export default Api;
