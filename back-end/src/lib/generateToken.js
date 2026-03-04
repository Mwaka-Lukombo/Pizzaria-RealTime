import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();


export const generateToken = (userId,res) =>{
  const token = jwt.sign({userId},process.env.SECRET,{
    expiresIn:"7d"
  })

  res.cookie("jwt",token,{
    secure:process.env.NODE_ENV === "production",
    httpOnly:true,
    maxAge:7 * 24 * 60 * 60 * 1000,
    sameSite:"strict"
  })

  return token
}




