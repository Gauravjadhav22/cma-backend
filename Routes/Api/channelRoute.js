const router = require('express').Router();
const { createChannel, deleteChannel, updateChannel, getAllChannels, getAChannel } = require('../../Controllers/channelController');



router.route('/').post(createChannel)
router.route('/com/:id').get(getAllChannels)
router.route('/:id').get(getAChannel).delete(deleteChannel).patch(updateChannel)


module.exports = router