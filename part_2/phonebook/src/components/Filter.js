import React from 'react'

const Filter = (props) => {

    return (
        <div>
            <p>filter with <input value={props.searchValue} onChange={props.handlerFunc} /></p>
        </div>
    )
}

export default Filter