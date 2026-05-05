import mongoose from 'mongoose'
import { config } from 'dotenv';

config()


async function DBconnect(){
    try{
    const conn = await mongoose.connect("mongodb://Alphonse:Ju87Maza@cluster0-shard-00-00.tyhrl.mongodb.net:27017,cluster0-shard-00-01.tyhrl.mongodb.net:27017,cluster0-shard-00-02.tyhrl.mongodb.net:27017/?ssl=true&replicaSet=atlas-2stdmh-shard-0&authSource=admin&appName=Cluster0",{
        serverSelectionTimeoutMS:5000
    });
    console.log("Connected: ", conn.connection.host);
    return conn;
    }catch(error){
        console.log("Error in connect DATABASE",error.message);

    }
}

export default DBconnect;



