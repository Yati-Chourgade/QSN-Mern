const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    email: {
        type:String,
        required:true

    },
    phone:{
        type: Number,
        required:true
    },
    profession:{
        type:String,
        require:true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }
]
})



//hash password

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

//token generation
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, "THSCHCJBDFVCJHSDULFCBSLEBVRJVRTHVBJBTRVVRVRTBVGTJR")
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
   
    }catch(err){
        console.log(err)
    }
}


//collection creation
const User = mongoose.model('USER',userSchema)

module.exports = User