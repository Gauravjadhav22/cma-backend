const refreshTokenController = require("../Controllers/refreshTokenController")

const router = require("express").Router()

router.get('/',refreshTokenController)


module.exports=router