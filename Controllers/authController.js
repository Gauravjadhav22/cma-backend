const User = require('../Models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { StatusCodes } = require('http-status-codes')

const authController = async (req, res) => {

    const { username, passwd, gmail } = req.body
    console.log(req.body);

    if (!(username || gmail) || !passwd) {
        return res.status(StatusCodes.BAD_REQUEST).
            json({ "msg": "username/gmail and password are required" })
        //
    }

    //finding user in db
    let foundUser;
    if (username) {

        foundUser = await User.findOne({ username })
    }
    if (gmail) {

        foundUser = await User.findOne({ gmail })
    }

    if (!foundUser) {

        return res.status(StatusCodes.UNAUTHORIZED)
            .json({ "msg": "user does not exists" })
        // 
    }


    const match = await bcrypt.compare(passwd, foundUser.passwd);

    if (match) {


        //     const refreshToken = jwt.sign(
        //         {
        //             user: {
        //                 username: foundUser.username,
        //             }

        //         }, process.env.REFRESH_TOKEN_SECRETE, {
        //         expiresIn: '2h'

        //     }
        //     )


        const accessToken = jwt.sign({
            user: {
                username: foundUser.username,
                gmail: foundUser.gmail,
                fullname: foundUser.fullname,
                userId: foundUser._id
            }
        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: '5d' })

        // foundUser.refreshToken = refreshToken;

        // const result = await foundUser.save()
        // Creates Secure Cookie with refresh token
        // res.cookie("jwt", refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "None",
        //     maxAge: 24 * 60 * 60 * 1000,
        // });

        // Send authorization access token to user

        return res.status(StatusCodes.OK)
            .json({
                "username": foundUser.username, "fullname": foundUser.fullname, "gmail": foundUser.gmail,
                accessToken
            })


    }
    else {
        return res.status(StatusCodes.UNAUTHORIZED)
    }




}


module.exports = authController
