import {axiosInstance} from '../lib/axios';
import {create} from 'zustand';
import {toast} from 'react-hot-toast';




export const cartStore = create((set,get) => ({
    isCreate:false,
    isDeleting:false,
    Cart:[],
    totalCart:null,
    createCart:async(data)=>{
        set({isCreate:true});

        try {
            const res = await axiosInstance.post('/cart',data);
            set({Cart:[...get().Cart,res.data]});
            toast.success("Product add in cart!");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }finally{
            set({isCreate:false})
        }
    },
    getCart:async()=>{
        try {
            const res = await axiosInstance.get('/cart');
            set({Cart:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    },
    deleteMany:async()=>{
     set({isDeleting:true});

     try {
        await axiosInstance.delete('/cart');
        set({Cart:[]});
     } catch (error) {
        toast.error(error.response?.data?.message);
     }finally{
        set({isDeleting:false});
     }
    },
    deleteCart:async(id)=>{
        try {
            const res = await axiosInstance.delete(`/cart/${id}`);
            set((state)=> ({
                Cart:state.Cart.filter((prev)=> prev._id !== id)
            }));
            toast.success("Product removed!");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
}))



