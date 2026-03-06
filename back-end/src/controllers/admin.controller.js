import User from "../models/use.model.js";
import Product from '../models/product.model.js';
import mongoose from "mongoose";
import { config } from "dotenv";
import {io} from '../lib/socket.io.js';

config();




export const getAllStats = async(req,res,next)=>{
    try {
        const totalUsers = await User.countDocuments();
         const totalProducts = await Product.countDocuments();

         res.status(200).json({
            totalUsers,
            totalProducts
         })
    } catch (error) {
        next(error)
    }
}


export const getAllUsers = async(req,res,next)=>{
    const adminEmail = process.env.adminEmail;
     const {page, limit} = req.query

     const skip = (page - 1) * limit;
     
    try {
       const users = await User.find({email:{$ne:"alphonse@gmail.com"}}).select("-password")
       .skip(skip)
       .limit(limit)
       ;

       const total = await User.countDocuments();
        const totalPages = Math.ceil((total / limit));

       if(!users) return;

       res.status(200).json({
        users,
        totalPages,
        currentPage:Number(page)
       })
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async(req,res,next)=>{
    try {
        const {id} = req.params
        

    

       const user = await User.findByIdAndDelete(id);
        const totalUsers = await User.countDocuments();
       //realTime emit totalUsers
       io.emit("totalUsers",totalUsers)
        
       if(!user){
         return res.status(404).json({message:"User not found!"});
       }
        res.status(200).json({message:"User deleted successfully!"});
        
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async(req,res,next)=>{
    try {
        const {page, limit} = req.query 

        let skip = (page - 1) * limit;
        
        

        const total = await Product.countDocuments();
          const totalPages = Math.ceil(total / limit); 

          const products = await Product.find()
            .skip(Number(skip))
            .limit(Number(limit));
        
        res.status(200).json({
            products,
            totalPages,
            currentPage:Number(page),
        })
    } catch (error) {
        next(error)
    }
}




