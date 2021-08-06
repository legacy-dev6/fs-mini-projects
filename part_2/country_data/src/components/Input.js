import React from 'react'

const Input = (props) => {
    
    return (
        <div>
            <p>find countries <input value={props.searchValue} onChange={props.handlerFunc} /></p>
        </div>
    )
}

export default Input