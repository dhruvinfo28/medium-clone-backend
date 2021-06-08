const mongoose = require('mongoose')

const blogSchema  = mongoose.Schema({
    user_id:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },
    heading:{
        required: true,
        type: String
    },
    sub_heading:{
        required: true,
        type: String
    },
    author:{
        required: true,
        type:String
    },
    date:{
        required: true,
        type: Date
    },
    content:{
        required:true,
        type:String
    },
    claps:{
        liked_by: [String],
    },
    dislikes:{
        liked_by: [String],
    },
    comment:{
        commented_by:[{
            comment_info: String,
            comment_email: String
        }]
    }
})

module.exports = mongoose.model('blogs',blogSchema);