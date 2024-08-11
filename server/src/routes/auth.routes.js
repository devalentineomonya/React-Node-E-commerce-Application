const express = require('express');
const passport = require('passport');
const { loginWithPassword, googleCallback } = require('../controllers/auth.controller');

const authRouter = express.Router();

// Google Authentication Routes
authRouter
    .get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }))
    .get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), googleCallback);

// Password Authentication Route
authRouter.post('/loginWithPassword', loginWithPassword);

module.exports = authRouter;
