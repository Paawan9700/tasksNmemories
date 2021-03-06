import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // as it is not allowing any api to fetch due to cors policy , so we need to install cors-policy package of express

    let initialnotes = [];
    const [notes, setnotes] = useState(initialnotes)
    // fetching all notes
    // API call:
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setnotes(json);
    }

    // adding a note
    const addNote = async (newNote) => {
        // API call:
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newNote)
        });

        const note = await response.json();
        // logic to add the note of a partcular user at the client side is here..
        setnotes(notes.concat(note));
    }

    // deleting a note
    const deleteNote = async (id) => {
        // API call:
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);


        // logic to delete the note of a partcular user at the client side is here:
        console.log("deleting a note with id " + id);
        const newNote = notes.filter((note) => { return (note._id !== id) })
        setnotes(newNote);
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API call:
        // making sure that all changes should also reflect in the backend also
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            // this basiclly means {title : title, description : description, tag : tag}
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json);
        // in react you update directly, you have to make a copy 
        const newNotes = JSON.parse(JSON.stringify(notes))

        // logic to edit the notes of a particular user at the client side is here:
        // basically as soon as i got the id of the particlar note which the user wanna delete
        // then corressponding to that id all (title, description, tag) are changed.
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag
                break;
            }
        }

        setnotes(newNotes);
    }

    return (
        // context api basic syntax
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;