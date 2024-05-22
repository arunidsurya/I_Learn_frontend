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
    if (
      response &&
      response.status === 401 &&
      response.data?.message === "Profile is blocked"
    ) {
      window.location.href = "/login"; 
      toast.error("Your profile is blocked. Please contact support.");
    }
    return Promise.reject(error);
  }
);

export default Api;
