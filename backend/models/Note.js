const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    // here User is the reference table and user id is acting as a foreign key in the notes table so basiclly linking both the tables 
    user : {
        // this is my foreign key which is not more than my user id
        type : mongoose.Schema.Types.ObjectId, 
        // ref table is my User table 
        ref : "User"
    },
    title : {
        type : String, 
        required : true
    }, 
    description : {
        type : String, 
        required : true, 
    }, 
    tag : {
        type : String, 
        default : "General"
    }, 
    Date : {
        type : Date, 
        default : Date.now
    }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note