const express = require('express')
const router = express.Router()
const {
    createPost, getAllPosts, deletePost, updateAPost, getAPost, getUserPosts, likeAndDislike
} = require("../../Controllers/postController")

router.route('/channel/:id').get(getAllPosts).post(createPost)
router.route('/like-dislike/:id').patch(likeAndDislike)

router.route('/:id').get(getAPost).patch(updateAPost).delete(deletePost)


module.exports = router