import { axiosInstance } from "../lib/axios";
import {create} from 'zustand'
import {toast} from 'react-hot-toast';



export const adminStore = create((set,get) => ({
 isChekingAdmin:false,
 totalUsers:null,
 totalProducts:null,
 users:[],
 getStats:async()=>{
    try {
        const res = await axiosInstance.get('/admin/stats');
        set({totalUsers:res.data.totalUsers});
        set({totalProducts:res.data.totalProducts})
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
 },
 getAllUsers:async()=>{
    try {
        const res = await axiosInstance.get('/admin/users');
        set({users:res.data});
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
 },
 deleteUser:async(id)=>{
    try {
        const {users} = get();

        await axiosInstance.delete(`/admin/user/${id}`);
        toast.success("User as deleted!");

        const newUsers = users.filter((prev) => prev._id !== id);
        set({users:newUsers})
        
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
 }
}));