//For like 

const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt_verify = require('../middlewares/jwt_verify')

const router = express.Router();

router.get('/:blogId',jwt_verify,(req,res)=>{
    let user_email;
    User.findById(req.user_id)
    .then(response=>{
        if(response){
            user_email = response.user_email;
            return Blog.findById(req.params.blogId);
        }else{
            res.status(403).json({message:'No such user'})
        }
    })
    .then(response2=>{
        response2.claps.liked_by.push(user_email);
        return response2.save();
    })
    .then(resp=>{
        res.status(200).json({message:'Successfully liked'})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    })
})

module.exports = router;