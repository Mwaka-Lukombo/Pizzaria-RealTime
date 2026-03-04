import DBconnect from './lib/db.js';
import Routes from './routes/routes.route.js'
import express from 'express'
import cookiParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

import {app,httpServer} from './lib/socket.io.js';

config();


const PORT = process.env.PORT || 5000;

app.use(cookiParser());
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

//Routes
app.use(Routes);


DBconnect().then(()=>{
    httpServer.listen(PORT,()=>{
    console.log(`A as runing in ${PORT}`)
})
})




//error manipulations
app.use((req,res,next)=>{
    res.status(500).json({message:process.env.MONGO_ENV === "development" ? err.message : "Internal Server Error"});
    
})













