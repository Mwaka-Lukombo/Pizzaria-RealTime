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
    try {
       const users = await User.find({email:{$ne:adminEmail}}).select("-password");

       if(!users) return;

       res.status(200).json(users)
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


