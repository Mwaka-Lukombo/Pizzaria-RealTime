import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import {io} from '../lib/socket.io.js';





export const createProduct = async(req,res,next)=>{
      const {name,category,price,rating,image, ingredients} = req.body 

      try {
        if(!name || !category || !price || !ingredients || !image){
           return res.status(400).json({message:"All fields are required!"});
        }

        const product = await Product.findOne({name,category,ingredients});

        if(product){
            return res.status(400).json({message:"Product already exists!"});
        }

        const newProduct = new Product({
            name,
            category,
            price,
            rating,
            image,
            ingredients
        })
        
        await newProduct.save();

        res.status(201).json(newProduct)
      } catch (error) {
        next(error);
      }
}



export const getProducts = async (req, res, next) => {
    try {
        let { category,page,limit } = req.query;

          

            page = Math.max(1, Number(page));
            limit = Math.max(1, Number(limit));
        let filter = {};
        let totalFound = {}

        if (category) {
            filter.name = {
                $regex: category,
                $options: "i" 
            };
        }

        let pageCurrent = page;
        let limitPage = limit;
        let skip = (pageCurrent - 1) * limitPage;

        const total = await Product.countDocuments(filter);

           const totalPages = Math.ceil((total / limit));

           

        const products = await Product.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        ;

        if(category !== ""){
            totalFound = await Product.countDocuments(filter);
        }
        

        res.status(200).json({
            products,
            totalPages,
            totalFound,
            currentPage:Number(page)
        });

    } catch (error) {
        next(error);
    }
};


export const bestRatings = async(req,res,next)=>{
     const {category} = req.query 

    
     let filter = {};
    if (category) {
        filter.category = { $regex: category, $options: "i" };
        }else{
            filter.rating = {$gte:5}
        }
       
     try {
         const products = await Product.find(filter)
         .sort({updatedAt:-1})
         .limit(6)
         ;
         
         if(!products) return;
         
         res.status(200).json(products);
     } catch (error) {
        next(error);
     }
}


export const getSingleProduct = async(req,res,next)=>{
      const {id} = req.params 

      if(!id) return;

      try{
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({message:"Product not found!"});
        }

        res.status(200).json(product);
      }catch(error){
        next(error);
      }
}


export const updateRating = async(req,res)=>{
    const {id} = req.params
     const {rating} = req.body


     
    try{
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:"Put any valid id!"});
      }

      if(!rating){
        return res.status(400).json({message:"Put the rating"});
      }

      const product = await Product.findByIdAndUpdate(id,{rating:rating},{new:true});
       const newProducts = await Product.find();
        const newProductsRating = await Product.find({rating:{$gte:5}}).sort({updatedAt:-1}).limit(6);

      //realtime validation
      //todo realtime createdProduct
       io.emit("newRatings",newProductsRating);
    
      res.status(200).json(product);
    }catch(error){
       next(error)
    }
}

export const deleteProduct = async(req,res,next)=>{
   const {id} = req.params 
   try {
    
    if(!id) return;

   const product = await Product.findByIdAndDelete(id);
    
   if(!product){
    return res.status(404).json({message:"Product not found!"});
   }
    res.status(200).json({message:"Product as delected!"});
   } catch (error) {
    next(error);
   }
}

