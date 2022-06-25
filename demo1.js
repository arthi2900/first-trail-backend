import  express from 'express';
import {MongoClient} from "mongodb";
const MONGO_URL="mongodb://localhost/";
const PORT=8000;
const app=express(); 
app.use(express.json());
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongo connect");
    return client;
}
export const client=await createConnection();


app.post("/User", async function (req, res) 
{// db.movies.insertMany(data)
    const data = req.body;
    console.log(data);
    //create a db,table
    const result = await client.db("socialmedia")
    .collection("User").insertMany(data);
    res.send(result);});
  
    app.get("/User/:id", async function (req, res) {
        console.log(req.params);
        const { id } = req.params;
        //const stud=student.find((mv)=>mv.id === id);
        const result = await client.db("socialmedia")
        .collection("User").find({id:id}).toArray();
        res.send(result);})

app.delete("/User/:id", async function (req, res) {
            console.log(req.params);
            const { id } = req.params;
            //const stud=student.find((mv)=>mv.id === id);
            const result = await client.db("socialmedia")
            .collection("User").deleteOne({ id: id });
            res.send(result);
        });
        app.put("/User/:id", async function (req, res) {
            console.log(req.params);
            const { id } = req.params;
            const updateData = req.body;
            //const stud=student.find((mv)=>mv.id === id);
            const result = await client.db("socialmedia")
            .collection("User").updateOne({ id: id }, { $set: updateData });
            res.send(result);
        });
        


            app.post("/Poster", async function (req, res) 
{// db.movies.insertMany(data)
    const data1 = req.body;
    console.log(data1);
    //create a db,table
    const result1 = await client.db("socialmedia")
    .collection("Poster").insertMany(data1);
    res.send(result1);});
  
 
 app.get("/Poster/:id", async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    //const stud=student.find((mv)=>mv.id === id);
    const result = await client.db("socialmedia")
    .collection("Poster").find({id:id}).toArray();
    res.send(result);})

    app.delete("/Poster/:id", async function (req, res) {
        console.log(req.params);
        const { id } = req.params;
        //const stud=student.find((mv)=>mv.id === id);
        const result = await client.db("socialmedia")
        .collection("Poster").deleteOne({ id: id });
        res.send(result);
    });
    app.put("/Poster/:id", async function (req, res) {
        console.log(req.params);
        const { id } = req.params;
        const updateData = req.body;
        //const stud=student.find((mv)=>mv.id === id);
        const result = await client.db("socialmedia")
        .collection("Poster").updateOne({ id: id }, { $set: updateData });
        res.send(result);
    });
    


    app.get("/",function(req,res){
        res.send("hi all");
 })
app.listen(PORT,function(){
    console.log(`successfull start from ${PORT}`)
})

