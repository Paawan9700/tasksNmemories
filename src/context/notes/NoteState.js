import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    let initialnotes = [];
    const [notes, setnotes] = useState(initialnotes)
    // fetching all notes
    // API call:
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZDU0OGU1MGI5Mjc0YzJmYWVmNWEwIn0sImlhdCI6MTY0MTkwOTQ0NX0.cR0cHdsJ582S9d2ryx05DUqg_6qvISI7P7qcf0s9KQ4"
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
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZDU0OGU1MGI5Mjc0YzJmYWVmNWEwIn0sImlhdCI6MTY0MTkwOTQ0NX0.cR0cHdsJ582S9d2ryx05DUqg_6qvISI7P7qcf0s9KQ4"
            },
            body: JSON.stringify(newNote)
        });

        // logic to add the note of a partcular user at the client side is here:
        console.log("adding a new note particular to this user...");
        setnotes(notes.concat(newNote));
    }

    // deleting a note
    const deleteNote = async (id) => {
        // API call:
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZDU0OGU1MGI5Mjc0YzJmYWVmNWEwIn0sImlhdCI6MTY0MTkwOTQ0NX0.cR0cHdsJ582S9d2ryx05DUqg_6qvISI7P7qcf0s9KQ4"
            },
        });


        // logic to delete the note of a partcular user at the client side is here:
        console.log("deleting a note with id" + id);
        const newNote = notes.filter((note) => { return (note._id !== id) })
        setnotes(newNote);
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API call:
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZDU0OGU1MGI5Mjc0YzJmYWVmNWEwIn0sImlhdCI6MTY0MTkwOTQ0NX0.cR0cHdsJ582S9d2ryx05DUqg_6qvISI7P7qcf0s9KQ4"
            },
            body: JSON.stringify({ title, description, tag })
        });


        // logic to edit the notes of a particular user at the client side is here:
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag
            }
        }
    }

    return (
        // context api basic syntax
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;