import * as React from 'react';

export default function BasicButtons({title, handleAction}) {
    return (
        <button onClick={handleAction} className='authButtons'>{title}</button>
    );
}