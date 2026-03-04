import {axiosInstance} from '../lib/axios';
import {create} from 'zustand';
import {toast} from 'react-hot-toast';



export const productStore = create((set,get)=> ({
 isCreating:false,
 isLoadingBest:false,
 isLoadingAllproducts:false,
 products:[],
 product:{},
 bests:[],
 getAllproducts:async(category= '', page)=>{
    set({isLoadingAllproducts:true});
  try{
      const res = await axiosInstance.get(`/product?category=${category}&&page=${page}&&limit=4`);
      set({products:res.data});
    }catch(error){
      toast.error(error.response?.data?.message);  
    }finally{
      set({isLoadingAllproducts:false})
    }
 },
 bestRatings:async(category = '')=>{
  set({isLoadingBest:true});
  try {
    const res = await axiosInstance.get(`/product/bests?category=${category}`);
    set({bests:res.data})
    
  } catch (error) {
    toast.error(error.response?.data?.message);
  }finally{
    set({isLoadingBest:false})
  }
 },
 updateRating:async(id,rating)=>{
  
     try {

       const res = await axiosInstance.patch(`/product/${id}`,{rating});
       toast.success("Updated successfully!")
     } catch (error) {
        toast.error(error.response?.data?.message);
     }
 },
 getSingleProduct:async(id)=>{
   try {
     const res = await axiosInstance.get(`/product/${id}`);
      set({product:res.data});
   } catch (error) {
     toast.error(error.response?.data?.message);
   }
 }
}))


