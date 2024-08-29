const express = require("express")
const cartRouter = express.Router()
const { getCart, addToCart, incrementQuantity, decrementQuantity, removeFromCart } = require("../controllers/cart.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")
cartRouter
    .get("/get", authMiddleware, getCart)
    .post("/add", authMiddleware, addToCart)
    .put("/increment/:productId", authMiddleware, incrementQuantity)
    .put("/decrement/:productId", authMiddleware, decrementQuantity)
    .delete("/delete/:productId", authMiddleware, removeFromCart)

module.exports = cartRouter