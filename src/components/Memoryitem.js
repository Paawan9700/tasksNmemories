import React, { useContext } from 'react'
import MemoryContext from '../context/memories/MemoryContext';

export const Memoryitem = (props) => {
    const context = useContext(MemoryContext);
    const { deleteMemory } = context;

    // destructing of a particular note
    const { title, description, tag } = props.Memory;

    // taking props from notes.js
    const { Memory, updateMemory } = props;
    const handleDelete = () => {
        props.showAlert("Memory Deleted Successfully", "success")
        deleteMemory(Memory._id);
    }

    const handleUpdate = () => {
        updateMemory(Memory);
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
