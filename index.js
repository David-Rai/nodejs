const http=require('http')
const {createServer}=http
const fs=require('fs')
const express=require('express')

//    configuring environment variable
require('dotenv').config()


const app=express()

app.get('/',(req,res)=>{
    res.status(200).json("hello brother this is homepage")

})



app.get('/about/:id',(req,res)=>{

    res.header("x-custom-header","cosadsdex").json({id:req.params.id})
})

const port=process.env.PORT
app.listen(port,()=> console.log("server starting"))