const mongoose = require("mongoose")

const Post = new mongoose.Schema({

    content: {
        type: String,
        required: true,
    }
    ,
    draft: {
        type: Boolean,
        default: false,
        required: true
    }
    ,


    // category: {
    //     type: String,

    // }
    // ,
    pictures: {
        type: Array
    }
    ,

    liked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }]
    ,
    disliked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }]
    ,


    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    channel: {
        type: mongoose.Types.ObjectId,
        ref: 'Channel',
        required: true
    }


}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model("Post", Post)