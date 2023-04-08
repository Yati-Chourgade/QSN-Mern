const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const authenticate = require ("../middleware/authenticate")

require('../db/conn')
const  User = require("../model/userSchema")

const  Ques = require("../model/ques")

// const {   } = require('../client/src/components/Alldata')




router.get('/',(req,res)=>{
    res.send('Hello world server router.js')
})


router.post('/register', async (req,res)=>{

    const { name, email, phone,  profession, password, cpassword  } = req.body

    if( !name || !email || !phone || ! profession || !password || !cpassword  ){
        return res.status(422).json({error: "please fill all fields"})
    }
    try{

        const userExist = await User.findOne({email:email})

        if(userExist){
            return res.status(422).json({error: "Already registered email id"})
        } else if(password != cpassword){
            return res.status(422).json({error: "password not matching"})
        } else {
            const user = new User({name, email, phone,  profession, password, cpassword})

            await user.save()

            res.status(201).json({message: "Registered Successfully"})

        }
         
    } catch(err){
        console.log(err)
        
    }  
})

router.post('/signin', async(req,res)=>{
    try{
        let token
        const{email, password} = req.body

        if(!email || !password){
            return res.status(400).json({error:"field empty"})
        }

        const userLogin = await User.findOne({email:email})
        
       
        if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password )

            token = await userLogin.generateAuthToken()
            console.log(token)

            res.cookie('jwtoken', token, {
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({message:"Invalid Credentials"})
            } else {
                res.json({message:"user signin Successful"})
            }
            

        }else{
            res.status(400).json({message:"Invalid Credentials"})
        }

       

    } catch(err){
        console.log(err)
    }

})

/*************************************************************/
//Quesform

router.post('/queform', authenticate,async (req,res)=>{

    const { qsn, subject, difficulty  } = req.body

    if( !qsn || !subject || !difficulty  ){
        return res.status(422).json({error: "please fill all fields"})
    }
    try{

        const quesExist = await Ques.findOne({qsn:qsn})

        if(quesExist){
            return res.status(422).json({error: "Question Already Present"})
        } else {
            const quest = new Ques({qsn, subject, difficulty })

            await quest.save()

            res.status(201).json({message: "Submitted Successfully"})

        }
         
    } catch(err){
        console.log(err)
        
    }  
})

/*********************************************************/


//
// Dashboard
router.get('/dashboard',authenticate, (req,res)=>{
    // res.send('Hello Dashboard server')
    res.send(req.rootUser)
})
/************************/
//homepage route

router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser)
})
/*************************************/
//logout route

router.get('/logout',(req,res)=>{
    res.clearCookie("jwtoken", {path:'/'})
    res.status(200).send('User Logout')
})
//************************************
//questioncard

router.get('/getques',authenticate,(req,res)=>{
    res.send(req.questions)
})

router.get('/quescard',authenticate, (req,res)=>{
    // res.send('Hello quescard server')
    res.send(req.questions)
})


module.exports = router