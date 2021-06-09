const app = require('./app')
const express = require('express')
const cors = require('cors')
const Blog  = require('./models/blog')

require('./middlewares/dbConnection')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.get('/api',(req,res)=>{
    console.log("this is the backend");
    res.status(200).json({message:'This is the root url of the backend'})
})

app.get('/api/blogs',(req,res)=>{
    Blog.find().select('heading sub_heading date author content image claps dislikes comment')
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    })
})

app.use('/api/users',require('./routes/users'))
app.use('/api/blog',require('./routes/blogPublish'))
app.use('/api/like',require('./routes/blogLike'))
app.use('/api/dislike',require('./routes/blogDislike'))
app.use('/api/comment',require('./routes/blogComment'))