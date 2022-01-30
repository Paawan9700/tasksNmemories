import React, { useState } from "react";
import MemoryContext from "./MemoryContext";

const MemoryState = (props) => {
    const host = "http://localhost:5000";
    // as it is not allowing any api to fetch due to cors policy , so we need to install cors-policy package of express

    let initialMemories = [];
    const [memories, setmemories] = useState(initialMemories);
    // fetching all notes
    // API call:
    const getMemory = async () => {
        const response = await fetch(`${host}/api/memory/fetchmemory`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setmemories(json);
    }

    // adding a Memory
    const addMemory = async (newMemory) => {
        // API call:
        const response = await fetch(`${host}/api/memory/addmemory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newMemory)
        });

        const memory = await response.json();
        // logic to add the note of a partcular user at the client side is here..
        setmemories(memories.concat(memory));
    }

    // deleting a memory
    const deleteMemory = async (id) => {
        // API call:
        const response = await fetch(`${host}/api/memory/deletememory/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);


        // logic to delete the note of a partcular user at the client side is here:
        console.log("deleting a note with id " + id);
        const newMemory = memories.filter((memory) => { return (memory._id !== id) })
        setmemories(newMemory);
    }

    // edit a note
    const editMemory = async (id, title, description, date) => {
        // API call:
        // making sure that all changes should also reflect in the backend also
        const response = await fetch(`${host}/api/memory/updatememory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            // this basiclly means {title : title, description : description, tag : tag}
            body: JSON.stringify({ title, description, date })
        });

        const json = await response.json();
        console.log(json);
        // in react you update directly, you have to make a copy 
        const newMemories = JSON.parse(JSON.stringify(memories))

        // logic to edit the meories of a particular user at the client side is here:
        // basically as soon as i got the id of the particlar note which the user wanna delete
        // then corressponding to that id all (title, description, tag) are changed.
        for (let index = 0; index < newMemories.length; index++) {
            if (newMemories[index]._id === id) {
                newMemories[index].title = title;
                newMemories[index].description = description;
                newMemories[index].date = date
                break;
            }
        }

        setmemories(newMemories);
    }

    return (
        // context api basic syntax
        <MemoryContext.Provider value={{ memories, addMemory, deleteMemory, editMemory, getMemory }}>
            {props.children}
        </MemoryContext.Provider>
    )
}

export default MemoryState;