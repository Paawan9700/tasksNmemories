import React from 'react';
import AddMemory from './AddMemory'
import { Memories } from './Memories'

const UserMemory = (props) => {
    return <div>
        {/* add note component for user to add new note into their particular collection */}
        <AddMemory showAlert={props.showAlert} />

        {/* displaying all notes specific to the particular notes */}
        <Memories showAlert={props.showAlert} />
    </div>;
};

export default UserMemory;
