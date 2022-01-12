import React from 'react'

export const Noteitem = (props) => {
    const { title, description, tag } = props.note;
    return (
        <div className='col-md-8'>
            <div className="card my-3">
                <div className="card-header">
                {title}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{description}</h5>
                    <p className="card-text">{tag}</p>
                </div>
            </div>
        </div>
    )
}
