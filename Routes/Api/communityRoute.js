const router = require('express').Router();
const {   createCommunity, deleteCommunity, updateCommunity, getAllCommunties, getACommunity } = require('../../Controllers/communityController');



router.route('/user/:id').get(getAllCommunties)
router.route('/').post(createCommunity)
router.route('/:id').get(getACommunity).delete(deleteCommunity).patch(updateCommunity)


module.exports=router