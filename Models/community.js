const mongoose = require("mongoose")
const CommunitySchema = new mongoose.Schema({

    name:
    {
        type: String,
        required: [true, "please provide channel's name"],
        maxlength: 60,
        minlength: 4


    },



    channels:
        [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Channel',
                
            }
        ],
    users:
        [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required:true
            }
        ]

    ,


    password: {
        type: String
    }
    ,


    about: {
        type: String
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Community', CommunitySchema);

