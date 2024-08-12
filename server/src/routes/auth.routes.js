const express = require('express');
const passport = require('passport');
const { loginWithPassword, googleCallback, verifyUser, regenerateVerificationCode, requestPasswordReset, resetPassword } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = express.Router();

// Google Authentication Routes
authRouter
    .get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }))
    .get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), googleCallback)
    .get("/verify", verifyUser)
    .post("/verify", authMiddleware, verifyUser)
    .get("/resendcode", authMiddleware, regenerateVerificationCode)
    .get("/getpasswordresetcode", requestPasswordReset)
    .get("/resetpassword",resetPassword)

// Password Authenticatio
authRouter.post('/loginWithPassword', loginWithPassword);

module.exports = authRouter;
