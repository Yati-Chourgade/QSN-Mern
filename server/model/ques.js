const mongoose = require('mongoose')

const ques = new mongoose.Schema({
    qsn:{
        type: String,
        required: true

    },
    subject: {
        type:String,
        required:true

    },
    difficulty:{
        type: Number,
        required:true
    }
   
})


//collection creation
const Ques = mongoose.model('Ques',ques)

module.exports = Ques