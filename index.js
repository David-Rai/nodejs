const express=require('express')
const app=express()
require('dotenv').config()

// it converts the fetch or axios json into the js objects
app.use(express.json())

//it serves the files like html,css,js and images to the client 
app.use(express.static('public'))

//it helps to understand the form plain data into readable format such as js 
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{

    res.send("home pages")
})

app.post('/add',(req,res)=>{
const data=req.body

res.json({message:"successfully added",data})

})

const port=process.env.PORT
app.listen(port,()=> console.log("server starting...."))