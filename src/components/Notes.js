import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { Noteitem } from './Noteitem';

export const Notes = () => {
    const context = useContext(NoteContext);
    const { notes } = context;
    return (
        <div>
            <div className="container my-5">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key = {note._id} note={note} />;
                })}  
            </div>
        </div>
    )
}
