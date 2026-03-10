import mongoose from "mongoose";
import Order, { Cart } from "../models/order.model.js";
import {io} from '../lib/socket.io.js';



export const createOder = async (req, res, next) => {
  const { id: userId, fullName: userName } = req.user;
   const {items} = req.body 
    let totalAccount = 0;

   if(!items) return res.status(400).json({message:"Your need send the items!"});
 
    try {
      
   const totalAmount = items.reduce((acc,item)=> {
    return acc + item.price * item.quantity
   },0);

   

   const newOrder = new Order( {
    userId,
    userName,
    items,
    totalAmount
   })


    

  await newOrder.save();
   

   

   res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  
};

export const createCart = async(req,res,next)=>{
     const {productId,name,price,image,quantity} = req.body 
      const {id:userId} = req.user 

      if(!name || !price || !image || !quantity){
        return res.status(400).json({message:"All fields are required!"})
      }


      try {

        const cartProduct = await Cart.findOne({name,price});

        if(cartProduct){
          return res.status(400).json({message:"Product already exits!"});
        }

        const newCart = new Cart( {
          userId,
          productId,
          name,
          price,
          quantity,
          image
        }
        )


        

        await newCart.save();

        res.status(201).json(newCart);
        
      } catch (error) {
        next(error)
      }
}

export const getSingleCart = async(req,res,next)=>{
  const {id} = req.user 


  try {
     
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({message:"Put one valid id"});
    }

    const cart = await Cart.find({userId:id});

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}

export const getSingleOrder = async(req,res,next)=>{
   const {id} = req.user

   try {
 
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:"Put one valid id"});
      }

      const orders = await Order.find({userId:id})

      res.status(200).json(orders);
   } catch (error) {
     next(error)
   }
}


export const getOrders = async(req,res,next)=>{
   const {page, limit} = req.query
   try {
 
    
      const skip = (page - 1) * limit;

      const orders = await Order.find({})
      .skip(skip)
      .limit(limit)

      const total = await Order.countDocuments();
       const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        orders,
        totalPages,
        currentPage:Number(page)
      });
   } catch (error) {
     next(error)
   }
}


