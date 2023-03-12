import axios from "axios";
import { getKreoLoginApi } from "./request";

const api = process.env.REACT_APP_API_URL;

const axiosIntance = axios.create({
  baseURL: api,
});

axiosIntance.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error?.response ? error?.response?.status : 500;
    if (status && status === 500) {
      //   showAlert("error", "Internal Server Error");
    }
    const originalRequest = error.config;
    if (status && status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return getKreoLoginApi()
        .then((res) => {
          if (res.status === 200) {
            let token = res?.data[0]?.split("=")[1]?.split(";")[0];
            localStorage.setItem("kreoToken", token);
            setTimeout(() => {
              return axiosIntance(originalRequest);
            }, 5000);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
