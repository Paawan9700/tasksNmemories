const express = require('express');
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "paawanisagoodb$oy";


// ROUTE 1 : create a user using POST : {/api/auth/createuser} -> ofc it doesn't require authetication
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

        // after new user has enteres all things then jwt will generate the auth-token 
        const data = {
            user: {
                id: newuser.id,
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2 : Authenticate a user using POST : {/api/auth/login} -> ofc it doesn't require authetication

router.post('/login', [
    // validating email and password entered by the user
    body('email', 'Please Enter a valid email').isEmail(),
    body('password', 'password cnanot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructuring email and password entered by the user 
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ error: "Please try to login with correct credentials" });
        }

        // comparing password corresponding to the valid user(who has entered the correct email)
        // console.log(user.password);
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).send({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
            }
        }
        { error: 'please authenticate using a valid token' }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3 : getting a user using POST : {/api/auth/getuser} -> ofc it require authetication
// fetch user is a function (middleware) which uses auth-token to verify already existing user so 
// that again and again login should not be required (auth-token presnet in user's browser)

// using middle ware just decoding (fetching) the user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});


module.exports = router; 
