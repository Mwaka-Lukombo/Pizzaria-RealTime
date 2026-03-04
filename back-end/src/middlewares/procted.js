import jwt from 'jsonwebtoken';
import User from '../models/use.model.js';

import { config } from 'dotenv';

config();


export const protectedRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt 

        if(!token){
            res.status(401).json({message:"Uanuthorized - Uanuthorized "})
        }

        const verify = jwt.verify(token,process.env.SECRET);

        if(!verify){
            return res.status(401).json({message:"Unauthorized - invalid token!"});
        }

        const decoded = await User.findById(verify.userId).select("-password");
        if(!decoded){
          return res.status(404).json({message:"User not found!"})
        }
        req.user = decoded;
        next();
        
    }catch(error){
        next(error);
    }
}


//verify admin
export const verifyAdmin = (req,res,next)=>{
    const currentUser = req.user.email 
     const isAdmin = process.env.AdminEmail

     if(currentUser !== isAdmin){
        return res.status(401).json({message:"Unauthorized - dont have premition!"})
     }
     next();
}




