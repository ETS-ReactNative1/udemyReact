import React from 'react'
import './UserOutput.css'

const userOutput = (props) => {

    return (
        <div className="UserOutput">
            <p>My name is {props.Name} and I'm here to say</p>
            <p>I like {props.Hobby} in a major way</p>
        </div>
    )
}

export default userOutput;