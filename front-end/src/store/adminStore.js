import { axiosInstance } from "../lib/axios";
import {create} from 'zustand'
import toast from 'react-hot-toast';



export const adminStore = create((set,get) => ({
 isChekingAdmin:false,
 isGetingUsers:false,
 isCreate:false,
 totalUsers:null,
 totalProducts:null,
 users:[],
 productsAll:[],
createProduct: async (data) => {
  set({ isCreate: true });

  try {
    const res = await axiosInstance.post('/product/create', data);

    set((state) => ({
      productsAll: [...state.productsAll.products, res.data]
    }));

    toast.success("Product created successfully!");
  
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    set({ isCreate: false });
  }
},
 getStats:async()=>{
    try {
        const res = await axiosInstance.get('/admin/stats');
        set({totalUsers:res.data.totalUsers});
        set({totalProducts:res.data.totalProducts})
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
 },
 getAllUsers:async(page)=>{
  set({isGetingUsers:true})
    try {
        const res = await axiosInstance.get(`/admin/users?page=${page}&&limit=3`);
        set({users:res.data});
    } catch (error) {
        toast.error(error.response?.data?.message);
    }finally{
      set({isGetingUsers:false})
    }
 },
 getAllProducts:async(page)=>{
   try {
     const res = await axiosInstance.get(`/admin/products?page=${page}&&limit=3`);
     set({productsAll:res.data})
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
 },
deleteProduct: async (id) => {
  try {
    await axiosInstance.delete(`/product/${id}`);
    toast.success("Product deleted successfully!");

    set((state)=>({
    productsAll:{
      ...state.productsAll,
      products: state.productsAll.products.filter(
        (product)=>product._id !== id
      )
    }
  }))

  } catch (error) {
    toast.error(error.response?.data?.message);
  }
}
}));