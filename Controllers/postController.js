const { StatusCodes } = require('http-status-codes')
const Post = require('../Models/post')
const Comment = require('../Models/comment')


const createPost = async (req, res) => {

    const { content, } = req.body
    req.body.user = req.user.userId;
    req.body.username = req.user.username;
    if (!content) {
        return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "please enter content .." })

    }

    try {

        const post = await Post.create({ ...req.body })

        res.status(StatusCodes.CREATED).json({ post })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }




}



const updateAPost = async (req, res) => {

    const { id } = req.params



    try {
        const post = await Post.findById({ _id: id })

        if (!post) {

            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no post found" })
        }
        const updatedPost = await Post.findByIdAndUpdate({ _id: id }, { content: req.body.newContent })
        res.status(StatusCodes.OK).json({ updatedPost })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}

const getAPost = async (req, res) => {

    const { id } = req.params



    try {
        const post = await Post.findOne({ _id: id })

        if (!post) {
            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no post found" })
        }

        res.status(StatusCodes.OK).json({ post })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


const deletePost = async (req, res) => {


    const { id } = req.params



    try {
        const post = await Post.findOne({ _id: id })

        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({ "msg": "no post found" })
        }
        await Post.findOneAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({ "msg": `deleted` })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }


}


const getUserPosts = async (req, res) => {

    const userId = req.user.userId
    try {
        const posts = await Post.find({ user: userId }).sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json(posts)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}

const likeAndDislike = async (req, res) => {


    const { id } = req.params

    const { like, dislike } = req.body
    const userId = req.user.userId
    try {
        const response = await Post.findOne({ _id: id })


        let liked = response.liked;
        let disliked = response.disliked;

        if (like) {
            const usr = liked.find((item) => item.toString() === userId)
            if (usr) {
                liked = liked.filter((item) => item.toString() !== userId);
                response.disliked = disliked
                response.liked = liked
                await response.save()

                return res.sendStatus(201)
            }

            disliked = disliked.filter((item) => item.toString() !== userId);
            liked.push(userId)


        }

        else {
            const usr = disliked.find((item) => item.toString() === userId)
            if (usr) {

                disliked.filter((item) => item.toString() !== userId);
                await response.save()
                response.disliked = disliked
                response.liked = liked
                return res.sendStatus(201)
            }
            liked = liked.filter((item) => item.toString() !== userId);
            disliked.push(userId)



        }
        response.disliked = disliked
        response.liked = liked

        await response.save()



        return res.status(201).json({ response })


    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }



}

const getAllPosts = async (req, res) => {

    const { id } = req.params

    try {
        const posts = await Post.find({ channel: id }).populate('user').sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json(posts)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


module.exports = {
    createPost, getAllPosts, deletePost, updateAPost, getAPost, getUserPosts, likeAndDislike
}