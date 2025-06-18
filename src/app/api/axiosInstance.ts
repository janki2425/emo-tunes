import axios from "axios"
import { config } from "process";

const BACKEND_URL='https://d552-106-213-48-176.ngrok-free.app';


const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    headers:{
        'Content-Type':'application/json',
        'ngrok-skip-browser-warning':'true'
      }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if (error.response?.status === 401){
            console.warn('Unauthorized! Redirecting or logging out...')
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;