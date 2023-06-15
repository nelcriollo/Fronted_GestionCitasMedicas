import axios, { AxiosRequestHeaders } from "axios";

const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/api/usuario' 
    });
  
    axiosInstance.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        if (typeof window !== "undefined") {
          if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/usuarios/login";
          }
        }
        return Promise.reject(error);
      },
    );

    axiosInstance.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
    
          if (token) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            } as AxiosRequestHeaders;
          }
        }
    
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  
  export default  axiosInstance;