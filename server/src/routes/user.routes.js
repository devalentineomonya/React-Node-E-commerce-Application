const express = require("express")
const {registerUser, getUser} = require("../controllers/user.controller")
const userRouter = express.Router()
 userRouter.post("/add",registerUser)
 .get("/get/:userId", getUser)


 module.exports = userRouter