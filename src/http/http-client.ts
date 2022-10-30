import axios, { AxiosInstance } from "axios";

export const authClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json"
  },
});

export const clientWithAuth = (token:string) => {
  return axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      "Authorization" : token,
    },
  });
}
