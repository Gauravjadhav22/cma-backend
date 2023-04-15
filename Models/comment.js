const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({


    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },


    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required:true

    },

    likes: {
        type: Number
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model("Comment", commentSchema)