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

   const order = await Order.findOne({userId,items});


   if(order){
    return res.status(400).json({message:"Order sending successfully!"})
   }

   const newOrder = new Order( {
    userId,
    userName,
    items,
    totalAmount
   })

  await newOrder.save();
  //realTimeGetting orders
   const orders = await Order.find();
   io.emit("getOrder",orders);

   

   res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  
};

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


//manipulation de order

export const acceptOrder = async(req,res,next) => {
    const {id} = req.params 

    try{
       if(!mongoose.isValidObjectId(id)){
         return res.status(400).json({message:"Invalid id!"})
       }

       const order = await Order.findByIdAndUpdate(id,{status:"accepted"}, {new:true});

       if(!order){
         return res.status(404).json({message:"Product not found!"});
       }

       res.status(200).json({accepted:true});
       
    }catch(error){
       next(error)
    }
}



export const paidOrder = async(req,res,next)=>{
   const {id} = req.params 
    const {userId} = req.user 
     const {amount, method,numberMobile,numberCard} = req.body

     const validMethods = ['Visa Card','mpesa','emola','M-kesh'];
     
     
     try{

       if(!amount){
         return res.status(400).json({message:"Put the payment!"});
       }

       if(!method){
         return res.status(400).json({message:"Select the payment method!"});
       }

       if(!numberMobile){
         return res.status(400).json({message:"Put the mobile our card number !"})
       }else if(numberMobile.length !== 9){
         return res.status(400).json({message:"Mobile number is invalid!"})
       }

        const numberValid = numberMobile[0].concat(numberMobile[1])

        if(method === "mpesa" && !numberValid.includes("84")){
           return res.status(400).json({message:"Number not belous Vodacom!"})
        }
        if(method === "emola" && !numberValid.includes("87")){
          return res.status(400).json({message:"Number not belous Movitel!"})
        }

       if(numberCard){
         if(numberCard.length !== 16){
           return res.status(400).json({message:"Card number is invalid!"})
         }
       }

        const order = await Order.find({_id:id});
          

         order.map((order)=> {
            if(amount < order.totalAmount){
             return res.status(400).json({message:"$ the cash not corresponde to de account"})
            }
         });

         if(!validMethods.includes(method)){
           return res.status(400).json({message:"Invalid method payment!"})
         }

      //update in database
       await Order.findByIdAndUpdate(id,{
        payment:true,
        method,
        status:"preparing",
        numberMobile,
        numberCard
       }, 
       {new:true}
      );
        
       res.status(200).json(order);
     }catch(error){
      next(error)
     }
}



export const finishOrder = async(req,res,next)=>{
   const {id} = req.params

   try {
     
     if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({message:"Invalid id!"});
     }

     const order = await Order.findByIdAndUpdate(id,{status:"finish"}, {new:true});

     if(!order){
       return res.status(404).json({message:"Product not found!"});
     }

      res.status(200).json(order);
     
   } catch (error) {
     next(error);
   }
}



