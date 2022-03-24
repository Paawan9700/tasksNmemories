import React, { useState, useContext } from 'react'
import MemoryContext from '../context/memories/MemoryContext';

const AddMemory = (props) => {
    // using context api to access addNote function directly into this file
    const context = useContext(MemoryContext);
    // taking the addNote function from the context API and 
    // trying to send the recently added note to the addNote function so that i can fetch after wards
    const { addMemory } = context;

    // defining the initial states of the notes
    const [Memory, setMemory] = useState({ title: "", description: "", tag: "" })

    // handling the event when user is typing on the givrn form
    const handleNote = (event) => {
        event.preventDefault(); //(so that page doesn't get reload)
        // sending the recently added note by the user
        addMemory(Memory);
        props.showAlert("Memory added Successfully", "success")
        setMemory({ title: "", description: "", tag: "" });
    }

    const handleChange = (event) => {
        // spread operator to add into the note as the user is typing
        // and changing the value by whatever the user is typing
        // whatever the user is typing basically overwrites the new value
        setMemory({ ...Memory, [event.target.name]: event.target.value })
    }

    return (
        <div className="container my-5">
            <h2>Add Your Memory</h2>
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
                <button disabled={Memory.title.length < 3 || Memory.description.length < 5} type="submit" onClick={handleNote} className="btn btn-primary">Add Memory</button>
            </form>
        </div>
    )
}

// sending by default so that this component can be used by any other component
export default AddMemory
