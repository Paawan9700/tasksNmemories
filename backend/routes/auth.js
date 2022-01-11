const express = require('express');
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "paawanisagoodb$oy";


// create a user using POST : {/api/auth} -> ofc it doesn't require authetication
// /api/auth/createuser -> no login rquired at this api
router.post('/createuser', [
    // validating entered deatils
    body('email', 'Please Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Min Password should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // but before that check that user with this email exists already
    // try and catch just to make sure that if any arror come then catch will deal with that
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send("soory, this email already in use")
        }
        
        // using bcrypt library for generating salt and using hash function of bcrypt package  to generate hash
        // await function is used just to make sure that after promise resolves then only this will go to next line
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        
        // creating validate user
        let newuser = await User.create({
            name: req.body.name,
            password: securedPassword,
            email: req.body.email
        })

        res.json(newuser);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("sone error occured");
    }
})

module.exports = router; 
