import React from 'react'

function Prayer({name , time}) {
    return (
        <div className="times my-3 d-flex align-items-center justify-content-between">
            <h3 className='mb-0'> {name}</h3>
            <span className='mb-0'>{time}</span>
        </div>
    )
}

export default Prayer
