import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json",
  },
});
export default apiClient;