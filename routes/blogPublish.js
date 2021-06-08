const Blog = require('../models/blog')
const express = require('express')
const verifyToken = require('../middlewares/jwt_verify');
const jwt_verify = require('../middlewares/jwt_verify');
const user = require('../models/user');
const router = express.Router();

// /api/blog
//Read all blogs of a particular user
router.get('/',verifyToken,(req,res)=>{
    Blog.find({user_id:req.user_id})
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Internal server error'})
    })
})

//CreateBlog of a particular user
router.post('/createBlog',jwt_verify,(req,res)=>{
   console.log(req.user_id);
   const data = req.body;
   new Blog({
       user_id:req.user_id,
       heading:data.heading,
       sub_heading:data.sub_heading,
       author:data.author,
       date:Date.now(),
       content: data.content,
       image: data.image,
       claps:[],
       dislikes:[],
       comment:[]
   }).save()
   .then(response=>{
        console.log(response);
        res.status(201).json({message:'Blog successfully saved'})
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({message:'Internal server error'})
   })
})


//Request type:
// {
//     "heading":"Pandat ka tisra blog",
//     "sub_heading":"Pandat ke blog ki subheading",
//     "author":"Gourav",
//     "content":"kuch ni sdfsfs sd hi dega"
// }

//Update blog of a particular user
router.patch('/updateBlog/:blogId',jwt_verify,(req,res)=>{
    const data = req.body;
    if(data){
        Blog.findOneAndUpdate({_id:req.params.blogId},data,{new:true})
        .then(response=>{
           res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
           res.status(500).json({message:'Internal server error'});
        })
    }
})

//Delete blog of a particular user
router.delete('/deleteBlog/:blogId',jwt_verify,(req,res)=>{
    Blog.deleteOne({_id:req.params.blogId})
    .then(response=>{
        res.status(200).json({message:'Blog successfully deleted'});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Internal server error'});
    })
})

module.exports = router;