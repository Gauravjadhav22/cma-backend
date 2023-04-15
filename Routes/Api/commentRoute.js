const express = require('express')
const router = express.Router()
const {
    postComment, deleteComment, getAllComments
} = require("../../Controllers/commentController")

router.post('/', postComment)
router.get('/:id', getAllComments)

router.delete('/:id', deleteComment)



module.exports = router