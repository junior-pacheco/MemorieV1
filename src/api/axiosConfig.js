import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://192.168.0.255:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
