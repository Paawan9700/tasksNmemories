import React from 'react'
import AddNote from './AddNote'
import { Notes } from './Notes'


export const Home = (props) => {

    return (
        <div>
            {/* add note component for user to add new note into their particular collection */}
            <AddNote showAlert={props.showAlert} />

            {/* displaying all notes specific to the particular notes */}
            <Notes showAlert={props.showAlert} />
        </div>
    )
}
