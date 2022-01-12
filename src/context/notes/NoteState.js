import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const initialnotes = [
        {
            "_id": "61ddaaf7e9bd4d84c684038b",
            "user": "61dd548e50b9274c2faef5a0",
            "title": "my title",
            "description": "wake up early",
            "tag": "personal",
            "Date": "2022-01-11T16:06:15.116Z",
            "__v": 0
        },
        {
            "_id": "61ddaaf7e9bd4d84c684038d",
            "user": "61dd548e50b9274c2faef5a0",
            "title": "my title",
            "description": "wake up early",
            "tag": "personal",
            "Date": "2022-01-11T16:06:15.478Z",
            "__v": 0
        },
        {
            "_id": "61ddaaf7e9bd4d84c684038f",
            "user": "61dd548e50b9274c2faef5a0",
            "title": "my title",
            "description": "wake up early",
            "tag": "personal",
            "Date": "2022-01-11T16:06:15.743Z",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(initialnotes)
    return (
        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;