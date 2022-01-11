const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const { route } = require('./auth');

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

//  ROUTE 3 : update the required note : {/api/notes/updatenote} -> ofc it require authetication
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        // creating a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // what if, the note any person want to update does not exists
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }

        // now checking the user updating only his/her notes
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("not allowed");
        }

        // find the note to be updated and update it
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        note = updatedNote;
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//  ROUTE 1 : deleting the  notes : {/api/notes/deletenote} -> ofc it require authetication
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // what if, the note any person want to delete does not exists
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }

        // now checking the user deleting only his/her notes
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("not allowed");
        }


        // find the note to be deleted and delete it
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        note = deleteNote;
        res.json({ "success": "note with the given id has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;