import axios from "axios";

const bookAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default bookAxiosInstance;
