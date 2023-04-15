const { StatusCodes } = require("http-status-codes");
const Channel = require("../Models/channel")

const createChannel = async (req, res) => {

    const { name, chatId, users } = req.body;
    console.log(req.body);
// try {
    
    if (!name) return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "Channel name is required" })

    const channel = await Channel.create({ ...req.body })

    return res.status(StatusCodes.CREATED).json({ channel })
    
// } catch (error) {
//     console.log(error);
// }




}
const updateChannel = async (req, res) => {

    const { id } = req.params

    try {
        const channel = await Channel.findById({ _id: id })
        console.log(channel);
        if (!channel) {

            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no Channel found" })
        }
        // const updatedChannel = await Channel.findByIdAndUpdate({ _id: id }, { users: req.body.users, name: req.body.name })

        channel.users = req.body.users;
        channel.name = req.body.name;

        await channel.save()
        res.status(StatusCodes.OK).json({ channel })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }



}

const getAllChannels = async (req, res) => {

    const { id } = req.params



    try {
        const Channels = await Channel.find({ draft: false }).sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json(Channels)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


const getAChannel = async (req, res) => {

    const { id } = req.params

    console.log(req.params);

    try {
        const channel = await Channel.findOne({ _id: id })

        if (!channel) {
            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no channel found" })
        }

        res.status(StatusCodes.OK).json({ channel })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


const deleteChannel = async (req, res) => {


    const { id } = req.params



    try {
        const channel = await Channel.findOne({ _id: id })

        if (!channel) {
            return res.status(StatusCodes.NOT_FOUND).json({ "msg": "no channel found" })
        }
        await Channel.findOneAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({ "msg": `deleted` })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }


}


module.exports = {
    createChannel, deleteChannel, updateChannel, getAllChannels, getAChannel
}