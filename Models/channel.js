const mongoose = require("mongoose")
const ChannelSchema = new mongoose.Schema({

    name:
    {
        type: String,
        required: [true, "please provide channel's name"],
        maxlength: 60,
        minlength: 4


    },



    users:
        [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                // required: true
            }
        ],
    community:{
        type: mongoose.Types.ObjectId,
        ref: 'Community',
        // required: true
    }


    ,





    chatId: {
        type: String,
        // required: false

    }
    ,
    img: {
        type: String
    }
    , about: {
        type: String
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Channel', ChannelSchema);

