import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import { Noteitem } from './Noteitem';

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();

    // component didmount
    useEffect(() => {
        if (localStorage.getItem('token'))
            getNotes();
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    // defining the initial states of the notes
    const [note, setnote] = useState({ _id: "", title: "", description: "", tag: "" })

    // handling the event when user is typing on the givrn form
    const handleClick = (event) => {
        event.preventDefault(); //(so that page doesn't get reload)
        editNote(note._id, note.title, note.description, note.tag);
        props.showAlert("Note Updated Successfully", "success")
        refClose.current.click();
    }

    const handleChange = (event) => {
        // spread operator to add into the note as the user is typing
        // and changing the value by whatever the user is typing
        // whatever the user is typing basically overwrites the new value
        setnote({ ...note, [event.target.name]: event.target.value })
    }

    const updateNote = (currNote) => {
        ref.current.click();

        // baiclly the note which is being clicked to be edited is this currNote

        setnote(currNote);
    }

    // reference hook just to make reference to something
    // which ever thing is being referenced will be executed
    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* i have to make sure for the input validation */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 3 || note.description.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2>Your Notes and Tasks</h2>
                {/* is there are no notes of the user to display  */}
                <div className="container">
                    {notes.length === 0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updateNote} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </div>
    )
}
