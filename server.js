//packages
require('express-async-errors')
require("dotenv").config()
const express = require("express");
const corsOptions = require("./config/corsOptions");
const credentials = require("./Middleware/credentials");
const cors = require('cors')
const cookieParser = require('cookie-parser');

//db
const connect = require("./Db/connect");

//routes
const authRoute = require("./Routes/authRoute")
const registerRoute = require("./Routes/registerRoute")
// const refreshTokenRoute = require("./Routes/refreshTokenRoute")
// const logoutRoute = require("./Routes/logoutRoute")
const apiPostRoute = require("./Routes/Api/posts")
const apiChannelRoute = require("./Routes/Api/channelRoute")
const apiCommunityRoute = require("./Routes/Api/communityRoute")
const userRoute = require("./Routes/Api/userRoute")
const commentRoute = require("./Routes/Api/commentRoute")


//middlware
const notFound = require("./Middleware/notFound.js");
const errorHandler = require("./Middleware/error-handler")
const verifyJwt = require("./Middleware/verifyJwt")



const app = express();

//Handle options credentials check -before cors!
//and fetch cookies 
app.use(credentials)

//cross origin resource sharing
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

//Middleware for json
app.use(express.json())

// Middleware for cookies
app.use(cookieParser())


app.use('/auth', authRoute)
app.use('/register', registerRoute)
// app.use('/token', refreshTokenRoute)
// app.use('/logout', logoutRoute)

app.use('/api/user', userRoute)
app.use(verifyJwt)
app.use('/api/channels', apiChannelRoute)
app.use('/api/communities', apiCommunityRoute)
app.use('/api/posts', apiPostRoute)
app.use('/api/comments', commentRoute)


app.use(errorHandler)

app.use(notFound)

const PORT = process.env.PORT || 8080
const Start = async () => {
    try {
        app.listen(PORT, console.log(`server is listening on ${PORT}`))
        await connect(process.env.MONGO_URI).then(() => console.log("connected to db~..."))
    } catch (error) {
        console.log(error);
    }
}

Start();



