// Api.js
import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      if (
        response.status === 401 &&
        response.data?.message === "Profile is blocked"
      ) {
        window.location.href = "/login";
        toast.error("Your profile is blocked. Please contact support.");
      } else if (response.status === 404) {

        window.location.href = "/error404";
      } else if (response.status === 500) {
        window.location.href = "/error500";
      } else {

        toast.error("An error occurred. Please try again later.");
      }
    } else {
      // Handle network errors
      toast.error("Network error. Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export default Api;
