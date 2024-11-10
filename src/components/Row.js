import React from 'react';
import './Row.css';

export default function Row({item,deleteTask}) {
    return (
        <li className="task-row" key={item.id}>{item.description}
         <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
        </li>
    )
}