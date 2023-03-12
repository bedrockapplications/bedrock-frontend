import axios from "axios";

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
      console.log("hello from ")
      return api
        .get("/external/authenticate")
        .then((res) => {
          if (res.status === 200) {
            console.log("res", res);
            let token = res?.data[0]?.split("=")[1]?.split(";")[0];
            localStorage.setItem("kreoToken", token);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });

      let errorobj = error?.response?.data;
      console.log("error400", errorobj);
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
