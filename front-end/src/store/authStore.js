import toast from "react-hot-toast";
import { create } from "zustand";
import {axiosInstance} from '../lib/axios';

import {io} from 'socket.io-client';




export const authStore = create((set,get) => ({
 userAuth:null,
 isCheking:true,
 isLogging:false,
 isRegister:false,
 Admin:false,
 Kitchen:false,
 socket:null,
 login:async(data)=>{
   set({isLogging:true});

   try{
     const res = await axiosInstance.post('/auth/login',data);
     set({userAuth:res.data});
     toast.success("Loggin successfully!")
     get().connectionSocket();
   }catch(error){
     toast.error(error.response?.data?.message);
   }finally{
      set({isLogging:false});
   }
 },
 sign:async(data)=>{
   set({isRegister:true});

   try {
     const res = await axiosInstance.post('/auth/sign',data);
     set({userAuth:res.data});
     toast.success("Register successfully!");
     get().connectionSocket();
   } catch (error) {
     toast.error(error.response?.data?.message);
   }finally{
    set({isRegister:false})
   }
 },
 connectionSocket:async()=>{
  const {userAuth} = get()
   if(!userAuth) return;

   const socket = io("http://localhost:5000",({
    //options handleshake

   }));

   set({socket:socket})
 },
 disconnectSocket:async()=>{
    const {socket} = get();
    if(socket.connected) socket.disconnect()
 },
 logout:async()=>{
   try {
     await axiosInstance.post('/auth/logout');
     toast.success("Logout successfully!");
     set({userAuth:null});
     get().disconnectSocket()
     set({Admin:false});
     set({Kitchen:false})
   } catch (error) {
     toast.error(error.response?.data?.message);
   }
 },
 theme:localStorage.getItem("theme-guide") || "light",
 check:async()=>{
    try{
       const res = await axiosInstance.get('/check');
       set({userAuth:res.data});
       get().connectionSocket();
       get(). verifyAdmin()
    }catch(error){
     console.log("Error in cheking store "+error.message);
    }finally{
        set({isCheking:false});
    }
 },
 verifyAdmin:async()=>{
    try {
       const res = await axiosInstance.get('/auth/verifyAdmin');
         set({Admin:res.data});
    } catch (error) {
      console.error(error.response?.data?.message)
    }
 },
 verifyKitchen:async()=>{
    try {
      const res = await axiosInstance.get('/auth/verifyKitchen');
      set({Kitchen:res.data.isKitchen})
    } catch (error) {
      console.log(error.response?.data?.message);
    }
 },
 setTheme:async(theme)=>{
   localStorage.setItem("theme-guide",theme);
   set({theme:theme})
 }
}))


