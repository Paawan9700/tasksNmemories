const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//  ROUTE 1 : fetching all notes : {/api/notes/fetchnotes} -> ofc it require authetication
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//  ROUTE 2 : adding notes entered by the user : {/api/notes/addnotes} -> ofc it require authetication
router.post('/addnote', fetchuser, [
    // validating entered notes by the user
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Min description should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // this implies that all the entered things are validate

    try {
        // using destucturing for taking out entered notes
        const { title, description, tag } = req.body;


        // now its time to create a new note and saving in our database
        const newNote = new Note({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })

        const savedNote = await newNote.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;