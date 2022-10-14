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
      console.log(status);
      //   showAlert("error", "Internal Server Error");
    }
    if (status && status === 401) {
      let errorobj = error?.response?.data;
      console.log("error400", errorobj);
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
