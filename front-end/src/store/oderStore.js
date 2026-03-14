import { axiosInstance } from "../lib/axios";
import {create} from 'zustand';
import toast from "react-hot-toast";




export const orderStore = create((set,get) => ({
 isLoading:false,
 isOrder:false,
 isCart:false,
 isPayment:false,
 Menus:[],
 Orders:[],
 Order:[],
 Cart:[],
 getMenu:async(search = '')=>{
    try {
       const res = await axiosInstance.get(`/product?search=${search}`);
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
 getOrderSingle:async()=>{
  
   try {
      const res = await axiosInstance.get('/order/Single');
      set({Order:res.data})
   } catch (error) {
      toast.error(error.response?.data?.message);
   }
 },
 createOrder:async(items)=>{
    set({isLoading:true});

    try {
      const res = await axiosInstance.post('/order',{items});
      
      set((state)=> ({
         Orders:[...state.Orders,res.data]
      }));
      set({Order:res.data});
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
  
 },

//  payment and realTime Manipulation
acceptOrder:async(id)=>{

   try{
      const res = await axiosInstance.patch(`/order/${id}`);
      toast.success("Order accepted!");
      
   }catch(error){
      toast.error(error.response?.data?.message);
   }
},
paidOrder:async(data,id)=>{
   set({isPayment:true});
   try {
       await axiosInstance.patch(`/order/payment/${id}`,data);
       toast.success("Payment Successfully!");
   } catch (error) {
      toast.error(error.response?.data?.message);
   }finally{
      set({isPayment:false});
   }
},
finishOrder:async(id)=>{
   try {
      if(!id) return;

      await axiosInstance.patch(`/order/finish/${id}`);
      toast.success("Order is finish!");
   } catch (error) {
      toast.error(error.response?.data?.message);
   }
}
}));




