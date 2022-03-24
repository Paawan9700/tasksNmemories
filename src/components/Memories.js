import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MemoryContext from '../context/memories/MemoryContext';
import { Memoryitem } from './Memoryitem';

export const Memories = (props) => {
    const context = useContext(MemoryContext);
    const { memories, getMemory, editMemory } = context;
    let navigate = useNavigate();

    // component didmount
    useEffect(() => {
        if (localStorage.getItem('token'))
            getMemory();
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    // defining the initial states of the notes
    const [Memory, setMemory] = useState({ _id: "", title: "", description: "", tag: "" })

    // handling the event when user is typing on the givrn form
    const handleClick = (event) => {
        event.preventDefault(); //(so that page doesn't get reload)
        editMemory(Memory._id, Memory.title, Memory.description, Memory.tag);
        props.showAlert("Memory Updated Successfully", "success")
        refClose.current.click();
    }

    const handleChange = (event) => {
        // spread operator to add into the note as the user is typing
        // and changing the value by whatever the user is typing
        // whatever the user is typing basically overwrites the new value
        setMemory({ ...Memory, [event.target.name]: event.target.value })
    }

    const updateMemory = (currNote) => {
        ref.current.click();

        // baiclly the note which is being clicked to be edited is this currNote

        setMemory(currNote);
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit Memory</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={Memory.title} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={Memory.description} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={Memory.tag} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={Memory.title.length < 3 || Memory.description.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Memory</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h2>Your Memories</h2>
                {/* is there are no notes of the user to display  */}
                <div className="container">
                    {memories.length === 0 && "No Notes to display"}
                </div>
                {memories.map((Memory) => {
                    return <Memoryitem key={Memory._id} updateMemory={updateMemory} Memory={Memory} showAlert={props.showAlert} />;
                })}
            </div>
        </div>
    )
}
