//dummy commit
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const mongodb_url="mongodb+srv://victorodam:jo08FRn39ag4GJn4@cluster0.uam3il2.mongodb.net/?retryWrites=true&w=majority";

export const db_connect = async () =>{
    try{
        await mongoose.connect(mongodb_url);
        console.log("Success! ");
    }catch(err){
      console.log(err.message);
    }
}