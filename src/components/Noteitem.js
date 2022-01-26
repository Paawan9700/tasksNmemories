import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    // destructing of a particular note
    const { title, description, tag } = props.note;

    // taking props from notes.js
    const { note, updatenote } = props;
    const handleDelete = () => {
        props.showAlert("Note Deleted Successfully", "success")
        deleteNote(note._id);
    }

    const handleUpdate = () => {
        updatenote(note);
    }
    return (
        <div className='col-md-8'>
            <div className="card my-3">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{description}</h5>
                    <p className="card-text">{tag}</p>
                    <i className="fas fa-trash-alt mx-2" onClick={handleDelete}></i>
                    <i className="fas fa-edit mx-2" onClick={handleUpdate}></i>
                </div>
            </div>
        </div>
    )
}
