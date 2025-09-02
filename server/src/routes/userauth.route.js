const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const { loginUser, signupUser,getProfile } = require('../controller/userauth.controller');

router.post('/login', loginUser);
router.get('/profile', requireAuth, getProfile);
router.post('/signup', signupUser);


module.exports =  router;