import React from 'react'
import { useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { Noteitem } from './Noteitem';

export const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;
    console.log(notes);
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const updatenote = (note) => {
        ref.current.click();
    }


    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        <div className="modal-body">
                            ...
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updatenote} note={note} />;
                })}
            </div>
        </div>
    )
}
