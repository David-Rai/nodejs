const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files from 'public' directory
app.use(express.static("public"));

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Home page route
app.get("/", (req, res) => {
  res.send("Hello, this is the home page");
});

// Users route (GET /users)
app.get("/users", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
    res.json(JSON.parse(data));
  });
});

//GET/users/:id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    }

    const datas = JSON.parse(data);
    const filtered = datas.filter((d) => d.id == id);

    res.json(filtered);
  });
});

//POST/users
app.post('/users',(req,res)=>{
const Userdata=req.body

fs.readFile('./data.json','utf8',(err,data)=>{
   if(err){
    res.send(err)
   }

     //adding the data
const finalData=JSON.parse(data)
finalData.push(Userdata)   
   
//writing into the user
fs.writeFile("./data.json",JSON.stringify(finalData,null,2),(err)=>{
    if(err){
        res.send(err)
    }
res.json({msg:"successfully added",finalData})    
})

})


})

//PUT/users/:id
app.put('/users/:id',(req,res)=>{
    const newData=req.body
    const userId=req.params.id

    fs.readFile("./data.json",'utf8',(err,data)=>{
        if(err){
            res.json(err)
        }

       const finalData=JSON.parse(data)
       const userIndex=finalData.findIndex((user)=> user.id == userId) 
       finalData[userIndex]={...finalData[userIndex],...newData}

              //writing the data into database
       fs.writeFile("./data.json",JSON.stringify(finalData,null,2),(err)=>{})
     res.json({msg:"sucessfully updated",newData})
        
    })



})

//DELETE/users/:id
app.delete('/users/:id',(req,res)=>{
    const userId=req.params.id

    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            res.json(err)
        }

        const finalData=JSON.parse(data)
        const filtered=finalData.filter(d=> d.id !== userId)

         //writing into the database
         fs.writeFile('./data.json',JSON.stringify(filtered,null,2),(err)=>{
            if(err){
                res.json(err)
            }
         res.json({msg:"sucessfully deleted",filtered})
         })
    })
})

// Start server on a port specified in .env file
const port = process.env.PORT;
app.listen(port, () => console.log("Server starting...."));
