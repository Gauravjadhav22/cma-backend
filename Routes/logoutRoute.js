const logoutController = require("../Controllers/logoutController")

const router = require("express").Router()

router.get('/',logoutController)


module.exports=router