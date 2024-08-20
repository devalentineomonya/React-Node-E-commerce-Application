const express = require('express');
const passport = require('passport');
const { loginWithPassword, googleCallback, verifyUser, regenerateVerificationCode, requestPasswordReset, resetPassword, changePassword } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = express.Router();

// Google Authentication Routes
authRouter
    .get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }))
    .get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), googleCallback)
    .get("/verify", verifyUser)
    .post("/verify", authMiddleware, verifyUser)
    .post("/resendcode", authMiddleware, regenerateVerificationCode)
    .post("/getpasswordresetcode", requestPasswordReset)
    .put("/resetpassword", resetPassword)
    .put("/changepassword/:userId", authMiddleware, changePassword)

// Password Authenticatio
authRouter.post('/loginWithPassword', loginWithPassword);

module.exports = authRouter;
