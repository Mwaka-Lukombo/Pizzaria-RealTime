import { axiosInstance } from "../lib/axios";
import zustand from 'zustand'




const adminStore = zustand.create((set,get) => ({
 isChekingAdmin:false,
 
}));