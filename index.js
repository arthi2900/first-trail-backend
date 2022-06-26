import  express from 'express';
import {MongoClient} from "mongodb";
import  {UserRouter} from './Userdata.js';
import  {PosterRouter} from './Posterdata.js';
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
dotenv.config();
//const MONGO_URL="mongodb://localhost/";
const MONGO_URL=process.env.MONGO_URL;
const PORT=process.env.PORT;
//const PORT=8000;
export const app=express(); 
app.use(express.json());
app.use(cors({
    allowedHeaders:"*",
    allowMethods:"*",
    origin :"*"
}));
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongo connect");
    return client;
}
export const client=await createConnection();
app.use('/User',UserRouter);
app.use('/Poster',PosterRouter);
   
app.listen(PORT,function(){
    console.log(`successfull start from ${PORT}`)
})



