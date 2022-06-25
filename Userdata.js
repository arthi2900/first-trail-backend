import { Userpost, Userget, Userdelete, Userput,Usersignuppost,getUserByName } from "./Userdb.js";
import  express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {auth}  from './middleware/auth.js';
import { client } from './index.js';
async function genPassword(password){
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);
    console.log({salt,hashpassword});
    return hashpassword;
    }
const router=express.Router();
router.post("/", async function (req, res) {
    const data = req.body;
    console.log(data);
    //create a db,table
    const result = await Userpost(data);
    res.send(result);
});
router.get("/", async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    //const stud=student.find((mv)=>mv.id === id);
    const result = await  client.db("socialmedia")
    .collection("User").find().toArray();
    res.send(result);
});

router.get("/:id",async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    //const stud=student.find((mv)=>mv.id === id);
    const result = await Userget(id);
    res.send(result);
});
router.delete("/:id", async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    //const stud=student.find((mv)=>mv.id === id);
    const result = await Userdelete(id);
    res.send(result);
});
router.put("/:id", async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    const updateData = req.body;
    //const stud=student.find((mv)=>mv.id === id);
    const result = await Userput(id, updateData);
    res.send(result);
});

router.post("/signup", async function (req, res) {
    const {name,password,email} = req.body;
    const hashpassword= await genPassword(password);
    const newUser={
        name:name,email:email,password:hashpassword,
    }
        //console.log(data);
    //create a db,table
    const result =await Usersignuppost(newUser);
    res.send(result);
});



router.post("/login", async function (req, res)
 {const { name, password } = req.body;
 //  db.users.findOne({username: "tamil"})
 const userFromDB = await getUserByName(name);
 console.log(userFromDB);
 if (!userFromDB) {res.status(401).send({ message: "Invalid credentials" });}
  else {const storedPassword = userFromDB.password; 
 
    const  isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log("isPasswordMatch", isPasswordMatch);
    if (isPasswordMatch) {
        //only depend by user id
        const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);
        res.send({ message: "Successfull login",token:token});}

 else {res.status(401).send({ message: "Invalid credentials" });}}});

export const UserRouter=router;
