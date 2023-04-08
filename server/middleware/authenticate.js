const jwt = require("jsonwebtoken")
const  User = require("../model/userSchema")
const Que = require("../model/ques")

const authenticate = async(req,res,next)=>{
    try{
        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token,"THSCHCJBDFVCJHSDULFCBSLEBVRJVRTHVBJBTRVVRVRTBVGTJR")
        const rootUser =await User.findOne({_id: verifyToken._id, "tokens.token":token})
        const questions =await Que.find({})

        
        if (!rootUser){ throw new Error('User not Found')}
       
        req.token =token
        req.rootUser = rootUser
        req.userID =rootUser._id
        req.questions = questions

        next()


    } catch (err){
        res.status(401).send("Unauthorised :No token provided")
        console.log(err)
    }


}

module.exports = authenticate