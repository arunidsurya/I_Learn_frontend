import axios,{AxiosInstance} from "axios";

const baseUrl= import.meta.env.VITE_BASE_URL;

const Api:AxiosInstance = axios.create({
    baseURL:baseUrl,
    withCredentials:true
})

export default Api;