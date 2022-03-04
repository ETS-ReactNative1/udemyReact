import React from 'react'

const userInput = (props) => {

    return (
        <div>
            <input style={props.style} onChange={props.textChange} defaultValue={props.default}/>
        </div>
    )
}

export default userInput;