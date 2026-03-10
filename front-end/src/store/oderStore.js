import { axiosInstance } from "../lib/axios";
import {create} from 'zustand';
import toast from "react-hot-toast";




export const orderStore = create((set,get) => ({
 isLoading:false,
 isOrder:false,
 isCart:false,
 Menus:[],
 Orders:[],
 Cart:[],
 getMenu:async()=>{
    try {
       const res = await axiosInstance.get('/product');
       set({Menus:res.data});
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
 },
 getOrders:async(page)=>{
   set({isOrder:true});
   try {
      const res = await axiosInstance.get(`/order?page=${page}&&limit=1`);
      set({Orders:res.data});
   } catch (error) {
      toast.error(error.response?.data?.message);
   }finally{
      set({isOrder:false});
   }
 },
 createOrder:async(items)=>{
    set({isLoading:true});

    try {
      const res = await axiosInstance.post('/order',{items});
      
      set((state)=> ({
         Orders:[...state.Orders,res.data]
      }));
      toast.success("Order Sending successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }finally{
      set({isLoading:false});
    }
 },
 createCart:async(data)=>{
  set({isCart:true});

  try {
  
    const res = await axiosInstance.post('/product/cart',data);
    set({Cart:res.data});
    toast.success("Add in cart successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message);
  }finally{
   set({isCart:false})
  }
  
 }
}));




