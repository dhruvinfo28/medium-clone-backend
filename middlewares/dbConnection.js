require('dotenv').config()
const mongoose = require('mongoose')


const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xgxot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongo_uri, { useUnifiedTopology: true })
.then((res)=>{
    console.log('db connected')
})
.catch(err=>{
    console.log(err);
})