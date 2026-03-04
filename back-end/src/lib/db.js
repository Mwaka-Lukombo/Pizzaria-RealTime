import mongoose from 'mongoose'
import { config } from 'dotenv';

config()


async function DBconnect(){
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected: ", conn.connection.host);
    return conn;
    }catch(error){
        console.log("Error in connect DATABASE",error.message);
    }
}

export default DBconnect;



