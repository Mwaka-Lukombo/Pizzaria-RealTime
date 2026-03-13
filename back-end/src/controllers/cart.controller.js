import mongoose from "mongoose";
import { Cart } from "../models/order.model.js";
import {io} from '../lib/socket.io.js';




export const createCart = async(req,res,next)=>{
  const {productId, name, price, image, quantity} = req.body 
    const {id:userId} = req.user 

     try{

        // if(!name || !price || !image || !quantity){
        //     return res.status(400).json({message:"All fields are required!"});
        // }

        const cart = await Cart.findOne({name,userId});

        if(cart){
            return res.status(400).json({message:"Product already in cart!"})
        }

        const newCart = new Cart( {
            userId,
            productId,
            name,
            price,
            image,
            quantity
        })
        
        await newCart.save();
        
        //create notification application
        const totalCart = await Cart.find({userId: new mongoose.Types.ObjectId(userId)}).length
        io.to(userId).emit("totalCart",totalCart);

        res.status(201).json(newCart);
        
     }catch(error){
        next(error);
     }

}



export const getCart = async(req,res,next)=>{
    const {id} = req.user 

    try{
 
          if(!mongoose.isValidObjectId(id)){
            return res.status({message:"invalid id!"})
          }

          const cart = await Cart.find({userId:id});
          
          res.status(200).json(cart);
    }catch(error){
        next(error)
    }
}



export const deleteCart = async(req,res,next)=>{
    const {id} = req.params

    try{

         if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({message:"Put valid id!"});
         }

         const cart = await Cart.findByIdAndDelete(id);

         if(!cart){
            res.status(404).json({message:"Product not found!"});
         }

         res.status(200).json({message:"Product deleted successfully!"})
    }catch(error){
        next(error)
    }
}


export const deleteManyCart = async(req,res,next)=>{
    const {id} = req.user 


    try {
        if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:"Id is invalid!"})
        }
    
      const cart = await Cart.deleteMany({userId:id});

       if(!cart){
        return res.status(400).json({message:"cart is empty!"})
       }
       res.status(200).json({message:"Cart is deleted!"})
    
    }catch (error) {
     next(error)   
    }

}




