import axios from 'axios';
import { config } from 'dotenv';


config();



const BASE_URL = "https://pizzaria-realtime-2.onrender.com/api" || "http://localhost:5000/api";

export const axiosInstance = axios.create({
    baseURL:`${BASE_URL}`,
    withCredentials:true
})





