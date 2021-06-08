const app = require('./app')
const express = require('express')

require('./middlewares/dbConnection')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api',(req,res)=>{
    console.log("this is the backend");
    res.status(200).json({message:'This is the root url of the backend'})
})

app.use('/api/users',require('./routes/users'))
app.use('/api/blog',require('./routes/blogPublish'))