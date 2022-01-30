import React from 'react';
import { Link } from 'react-router-dom';

const Choise = () => {
    return <div className='container'>
        <Link className="btn btn-primary mx-2" to='/YourTasks' role="button">Your Tasks</Link>
        <Link className="btn btn-primary mx-2" to='/YourMemories' role="button">Your Memory</Link>
    </div>;
};

export default Choise;

