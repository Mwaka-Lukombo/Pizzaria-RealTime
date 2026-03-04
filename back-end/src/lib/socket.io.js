import {Server} from 'socket.io';
import {createServer} from 'http';
import express from 'express';
import Product from '../models/product.model.js';




const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,({
    // options
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    }
}))

io.on("connection",async(socket) => {
    console.log("A user as connected: ", socket.id);

    const newProductsRating = await Product.find({rating:{$gte:5}})
    .sort({updatedAt:-1})
    .limit(6);

socket.emit("newRatings", newProductsRating);
    socket.on("disconnect",()=>{
        console.log("A user as disconnected: ",socket.id);
    })
})





export {app,httpServer, io};







