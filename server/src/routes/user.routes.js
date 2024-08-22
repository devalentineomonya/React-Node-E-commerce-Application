const express = require("express")
const { registerUser, getUser, updateUser } = require("../controllers/user.controller")
const {authMiddleware} = require('../middlewares/auth.middleware');
const userRouter = express.Router()
userRouter
    .post("/add", registerUser)
    .get("/get/:userId",authMiddleware, getUser)
    .put("/update/:userId", authMiddleware, updateUser)


module.exports = userRouter