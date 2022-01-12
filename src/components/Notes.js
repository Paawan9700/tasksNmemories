import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { Noteitem } from './Noteitem';

export const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setnotes } = context;
    return (
        <div>
            <div className="container my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem note={note} />;
                })}
            </div>
        </div>
    )
}
