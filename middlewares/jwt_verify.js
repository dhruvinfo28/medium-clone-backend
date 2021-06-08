require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,process.env.JWT_TOKEN,(err,decoded)=>{
            if(err){
                res.status(403).json({message:'Authentication error'})
            }else{
                req.user_id = decoded.user_id;
                next();
            }
        })
    }else{
        res.status(403).json({message:'Authentication error'})
    }
}