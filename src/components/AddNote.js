import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    // using context api to access addNote function directly into this file
    const context = useContext(NoteContext);
    // taking the addNote function from the context API and 
    // trying to send the recently added note to the addNote function so that i can fetch after wards
    const { addNote } = context;

    // defining the initial states of the notes
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    // handling the event when user is typing on the givrn form
    const handleNote = (event) => {
        event.preventDefault(); //(so that page doesn't get reload)
        // sending the recently added note by the user
        addNote(note);
        setnote({ title: "", description: "", tag: "" });
    }

    const handleChange = (event) => {
        // spread operator to add into the note as the user is typing
        // and changing the value by whatever the user is typing
        // whatever the user is typing basically overwrites the new value
        setnote({ ...note, [event.target.name]: event.target.value })
    }

    return (
        <div className="container my-5">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" onClick={handleNote} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

// sending by default so that this component can be used by any other component
export default AddNote
