const express = require('express');
const router = express.Router()
const User = require('../models/User');

// create a user using POST : {/api/auth} -> ofc it doesn't require authetication
router.post('/', (req, res) => {
    console.log(req.body);
    const newUser = User(req.body);
    newUser.save();
    res.send('hello auth');
})

module.exports = router; 
