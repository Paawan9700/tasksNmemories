import React from 'react'
import AddNote from './AddNote'
import { Notes } from './Notes'


export const Home = () => {

    return (
        <div>
             {/* add note component for user to add new note into their particular collection */}
            <AddNote />

             {/* displaying all notes specific to the particular notes */}
            <Notes />
        </div>
    )
}
