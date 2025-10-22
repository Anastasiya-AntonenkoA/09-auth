import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
const apiServer = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiServer;