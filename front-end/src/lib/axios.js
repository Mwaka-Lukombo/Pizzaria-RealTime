import axios from 'axios';



const BASE_URL = process.env.REACT_APP_URL || "http://localhost:5000";


export const axiosInstance = axios.create({
    baseURL:`https://pizzaria-realtime-02.onrender.com/api`,
    withCredentials:true
})





