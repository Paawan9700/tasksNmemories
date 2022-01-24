import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

export const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { title, description, tag } = props.note;
    const {note, updateNote} = props;
    const handleDelete = () => {
        deleteNote(note._id);
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
                    <i className="fas fa-edit mx-2" onClick={() => {updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}
