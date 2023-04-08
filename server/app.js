const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()


require('./db/conn')
// const User = require('./model/userSchema')
// const Ques =require('./model/ques')

app.use(express.json())
app.use(cookieParser())
app.use(require('./router/auth'))



// app.get('/Dashboard', (req,res)=>{
//     res.send('Hello contact server')
// })

// app.get('/signin', (req,res)=>{
//     res.send('Hello signin server')
// })

// app.get('/signup', (req,res)=>{
//     res.send('Hello signup server')
// })


app.listen(5000, ()=>{
    console.log(`server is running at port no 5000`)
})