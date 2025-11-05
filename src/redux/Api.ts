import axios from "axios";

const api = axios.create({
  baseURL: "https://camp-coding.tech/test_api/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
