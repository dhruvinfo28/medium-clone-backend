require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const mongoose = require('mongoose');
const jwt_verify = require('../middlewares/jwt_verify')

const router = express.Router();



// /api/users



//route for registering users
//request type should be 
// {
//     "user_email":"pandat@123.com",
//     "user_name":"Pandat",
//     "first_name":"Gourav",
//     "last_name":"Sharma",
//     "user_password":"1234"
// }

router.post('/signup',(req,res)=>{
    const data = req.body;
    if(data.user_email && data.user_name && data.first_name && data.last_name && data.user_password){
        User.find({user_email: data.user_email})
        .then((result)=>{
            if(result.length>0){
                //User email  exists
                res.status(409).json({message:'user_email repeat'});
            }else{
                User.find({user_name:data.user_name})
                .then(result2=>{
                    if(result2.length > 0){
                        res.status(409).json({message:'user_name repeat'});
                    }
                    else{
                        //Create a new user
                        bcrypt.hash(data.user_password,10)
                        .then((hashedPassword)=>{
                                return new User({
                                    user_name:data.user_name,
                                    user_email: data.user_email,
                                    user_password: hashedPassword,
                                    first_name: data.first_name,
                                    last_name: data.last_name
                                }).save()
                        })
                        .then(response=>{
                            res.status(201).json({message:'New user created'})
                        })
                        .catch((err)=>{
                            console.log('bcrypt err or mongoose',err);
                            res.status(500).json({message:'Internal server error'});
                        })
                    }
                })
                .catch(err=>{
                    res.status(500).json({message:'Internal server error'});
                })
            }
        })
        .catch(err=>{
            res.status(500).json({message:'Internal server error'});
        })
    }else{
        res.status(400).json({message:'Bad request'});
    }
})


//Request body type:

//{
    //     "user_email":"pandat@123.com",
    //     "user_password":"1234"
    // }
    
router.post('/login',(req,res)=>{
    console.log('Reached user login')
    const data = req.body;
    if(data.user_email && data.user_password){
        User.findOne({user_email:data.user_email})
        .then((result)=>{
            if(result){
                bcrypt.compare(data.user_password,result.user_password)
                .then(response=>{
                    if(response){
                        //correct password
                        jwt.sign({user_id:result._id},process.env.JWT_TOKEN,(error,token)=>{
                            if(error){
                                res.status(500).json({message:'Internal server error'})
                            }else{
                                res.status(200).json({token})
                            }
                        })
                    }else{
                        res.status(403).json({message:'Wrong email or password'})
                    }
                })
                .catch(err=>{
                    console.log('bcrypt err or mongoose',err);
                    res.status(500).json({message:'Internal server error'});
                })
            }else{
                res.status(403).json({message:'Wrong email or password'})
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'Internal server error'});
        })
    }else{
        res.status(400).json({message:'Bad request'});
    }
})


router.get('/getLoggedInUser',jwt_verify,(req,res)=>{
    User.findOne({_id:req.user_id}).select('user_email user_name first_name last_name')
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Internal server error'});
    })
})

module.exports = router;