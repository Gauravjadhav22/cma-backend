const Comment = require('../Models/comment')
const { StatusCodes } = require('http-status-codes')


const getAllComments = async (req, res) => {

    const { id } = req.params


    try {
        const comments = await Comment.find({ post: id }).sort({ createdAt: 1 })
        res.status(StatusCodes.OK).json(comments)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "msg": error.message })
    }




}

const postComment = async (req, res) => {

    const { content, likes, userId, post } = req.body

    if (!content) {
        return res.status(StatusCodes.BAD_REQUEST)
    }


    try {
        const comment = await Comment.create({ post, userId, content, likes })
        res.status(StatusCodes.OK).json({ comment })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }



}

const deleteComment = async (req, res) => {

    const { id } = req.params

    try {
        await Comment.findByIdAndDelete({ _id: id })

        res.status(StatusCodes.OK)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "msg": error.message })
    }

}


module.exports = { postComment, deleteComment, getAllComments }