const { StatusCodes } = require("http-status-codes");
const Community = require("../Models/community")

const createCommunity = async (req, res) => {

    const { name, channels, password } = req.body;
    console.log(req.body);

    if (!name) return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "Community name is required" })

    const community = await Community.create({ name, channels, password })

    return res.status(StatusCodes.CREATED).json({ community })



}
const updateCommunity = async (req, res) => {

    const { id } = req.params
    const { password, users, channels } = req.body
    console.log(req.body);
    try {
        const community = await Community.findById({ _id: id })
        if (password !== community.password) {
            res.status(StatusCodes.BAD_REQUEST).json({ "msg": "wrong community passwd!.." })
        }
        if (!community) {

            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no Community found" })
        }
        // const updatedCommunity = await Community.findByIdAndUpdate({ _id: id }, { users: req.body.users, name: req.body.name })

        const cchannels = community.channels;
        const cusers = community.users;
        community.channels = [...cchannels, ...channels]
        community.users = [...cusers, ...users];

        await community.save()
        console.log(community);
        res.status(StatusCodes.OK).json({ community })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }



}

const getAllCommunties = async (req, res) => {

    const { id } = req.params
    console.log(req.params);


    try {
        const Communties = await Community.find({ users: { $in: [`${id}`] } })
        res.status(StatusCodes.OK).json(Communties)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


const getACommunity = async (req, res) => {

    const { id } = req.params

 

    try {
        const community = await Community.findOne({ _id: id })

        if (!community) {
            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no community found" })
        }

        res.status(StatusCodes.OK).json({ community })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


const deleteCommunity = async (req, res) => {


    const { id } = req.params



    try {
        const community = await Community.findOne({ _id: id })

        if (!community) {
            return res.status(StatusCodes.NOT_FOUND).json({ "msg": "no community found" })
        }
        await Community.findOneAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({ "msg": `deleted` })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }


}


module.exports = {
    createCommunity, deleteCommunity, updateCommunity, getAllCommunties, getACommunity
}