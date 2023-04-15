const User = require('../Models/user')
const bcrypt = require("bcrypt")
const { StatusCodes } = require('http-status-codes')

const registerController = async (req, res) => {

    const { fullname, username, gmail, passwd } = req.body

    if (!username || !passwd || !fullname || !gmail) {



        return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "fullname ,gmail,username and password are required" })
    }


    if (username) {
        
       const duplicate= await User.findOne({ username })
       if (duplicate) return res.status(StatusCodes.CONFLICT).json({ "msg": "username already exist try another username" })
    }
    if(gmail){
        duplicate=await User.findOne({ gmail })
        if (duplicate)   return res.status(StatusCodes.CONFLICT).json({ "msg": "gmail already exist try another username" })
    }



    try {


        const salt = await bcrypt.genSalt(10);
        const hashedPasswd = await bcrypt.hash(passwd, salt)



        const newUser = new User({
            fullname,
            username,
            gmail,
            passwd: hashedPasswd
        });
        await newUser.save();
        // console.log(newUser);

        res.status(StatusCodes.CREATED).json({ 'success': `New user ${username} created!` });
        // json({username:result.username,gmail:result.gmail},"successfully registered")
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }




}

module.exports = registerController