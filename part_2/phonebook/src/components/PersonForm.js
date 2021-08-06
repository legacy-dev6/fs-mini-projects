import React from 'react'

const PersonForm = (props) => {

    return (
        <form onSubmit={props.submitFunc}>
            <p>name: <input value={props.nameValue} onChange={props.nameHandler} /></p>
            <p>number: <input value={props.numValue} onChange={props.numHandler} /></p>
            <button type='submit'>Add</button>
        </form>
    )
}

export default PersonForm