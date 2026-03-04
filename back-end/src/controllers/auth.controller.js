import bcryptjs from 'bcryptjs';
import User from '../models/use.model.js';
import {generateToken} from '../lib/generateToken.js'
import { config } from 'dotenv';


export const sign = async(req,res,next)=>{
  const {fullName, email,password} = req.body ;

  try {
    if(!fullName || !email || !password){
     return res.status(400).json({message:"All fields are required!"});
    }

    if(password.length < 6){
        return res.status(400).json({message:"Your password must be 6 characteres!"});
    }

    const user = await User.findOne({email});

    if(user){
        return res.status({message:"User already exists!"});
    }

    //cripting password
    const genSalt = await bcryptjs.genSalt(12);
    const passwordHash = await bcryptjs.hash(password,genSalt);

    const newUser = new User({
        fullName,
        email,
        password:passwordHash
    })

    await newUser.save();

    if(newUser){
     //generateToken
     generateToken(newUser._id,res);
    }
    
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export const login = async(req,res,next)=>{
    const {email,password} = req.body 

    try{
       if(!email || !password){
        return res.status(400).json({messaage:"All fields are required!"})
       }

       const user = await User.findOne({email});

       if(!user){
        return res.status(404).json({message:"User not found!"});
       }

       //compare password
       const validPassword = await bcryptjs.compare(password,user.password);

       if(!validPassword){
         return res.status(400).json({message:"Invalid credentials!"});
       }else{
         generateToken(user._id,res);
       }
       
       res.status(200).json(user);
    }catch(error){
      next(error);
    }
}

export const logout = async(_,res,next)=>{
    try{
      res.cookie("jwt","",{maxAge:0});
      res.status(200).json({message:"Logout successfully!"})
    }catch(error){
      next(error)
    }
}

export const check = async(req,res,next)=>{
    try{
      res.status(200).json(req.user);
    }catch(error){
        next(error);
    }
}


export const verifyDashbord = async(req,res,next)=>{
    try{

      if(req.user.email === process.env.AdminEmail){
       res.status(200).json({isAdmin:true});
      }else if(req.user.email === process.env.KitechEmail){
        res.status(200).json({isKitchen:true});
      }
    }catch(error){
        next(error);
    }
}





