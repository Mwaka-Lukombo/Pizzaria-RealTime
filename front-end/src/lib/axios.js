import axios from 'axios';



const BASE_URL = process.env.REACT_APP_URL || "http://localhost:5000";


export const axiosInstance = axios.create({
    baseURL:`${BASE_URL}/api`,
    withCredentials:true
})





