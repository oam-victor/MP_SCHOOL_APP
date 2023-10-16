import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const mongodb_url=process.env.MONGODB_URL;

export const db_connect = async () =>{
    try{
        await mongoose.connect(mongodb_url);
        console.log("Success! ");
    }catch(err){
      console.log(err.message);
    }
}