import React, {useState, useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    // using context api to access addNote function directly into this file
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title : "", description : ""})
    const handleNote = (event) => {
        event.preventDefault();
        addNote(note);
    }

    const handleChange = (event) => {
        // spread operator to add into the note as the user is typing
        setnote({...note, [event.target.name] : event.target.value})
    }

    return (
        <div className="container my-5">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name = "description" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleNote} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
