const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Memory = require('../models/Memory');
const { body, validationResult } = require('express-validator');
const { route } = require('./auth');

// Route - 1 -> use to fetch memory of a partilculat user {/api/memory/fetchmemory} -> it also requires authentication
// so that any other person can't see the memory of others

router.get('./fetchmemory', fetchuser, async (req, res) => {
    try {
        const memories = await Memory.find({ user: req.user.id })
        // you have to wait until any proise is returned
        res.send(memories);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Interneral server error");
    }
})


// Route -2 -> adding memory entered by the user {api/memory/addmemory} -> ofc it requires authentication
// so that added memory will be added  at the user specific place

router.post('addmemory', fetchuser, [
    // validating entered memory by the user
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Min description should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {

    // if there is any error in validation then you have to return from here 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, date } = req.body;

        // now its time to create a new memory and saving in our Memory model
        const newMemory = new Memory({
            title: title,
            description: description,
            date: date,
            user: req.user.id
        })

        const savedMemory = await newMemory.save();
        res.json(savedMemory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
})

// Route -3 -> updating any memory (/api/auth/updatememory)  -> ofc it also requires authentication
// so that it allows only authenticate users to edit their notes

router.put('./updatememory/:id', fetchuser, async (req, res) => {
    try {

        const { title, description, date } = req.body;

        // what if, the memory any person want to update does not exists
        let memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).send("not found");
        }

        const newMemory = {};
        if (title) {
            newMemory.title = title;
        }
        if (description) {
            newMemory.description = description;
        }
        if (date) {
            newMemory.date = date;
        }

        // now checking the user updating only his/her notes
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("not allowed");
        }

        // find the memory to be updated and update it
        const updatedMemory = await Note.findByIdAndUpdate(req.params.id, { $set: newMemory }, { new: true });
        memory = updatedMemory;
        res.json(memory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
})

// Route 4 -> delete memory if the user didn't want that shit memory {api/memory/deletememory} -> authentication requires
router.delete('./deletememory/:id', fetchuser, async (req, res) => {
    try {
        // what if, the memory any person want to delete does not exists
        let memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).send("not found");
        }

        // now checking the user deleting only his/her memory
        if (req.user.id !== Memory.user.toString()) {
            return res.status(401).send("not allowed");
        }


        // find the memory to be deleted and delete it
        const deleteMemory = await Memory.findByIdAndDelete(req.params.id);
        memory = deleteMemory;
        res.json({ "success": "note with the given id has been deleted", memory: memory });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router;