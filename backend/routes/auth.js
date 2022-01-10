const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// create a user using POST : {/api/auth} -> ofc it doesn't require authetication
router.post('/', [
    body('email', 'Please Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Min Password should be of 5 length').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // creating validate user
    try {
        User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }).then(user => res.json(user))
            .catch(err => {
                console.log(err)
                res.json({ error: "this email is alreadt in use", message: err.message })
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send("this email is already in use");
    }
})

module.exports = router; 
