const mongoose = require('mongoose')

const userSchema  = mongoose.Schema({
    user_email:{
        type:String,
        required:true
    },
    user_password:{
        required:true,
        type:String
    },
    user_name:{
        required:true,
        type:String,
    },
    first_name:{
        required:true,
        type:String,
    },
    last_name:{
        required:true,
        type:String,
    },
})

module.exports = mongoose.model('users',userSchema);