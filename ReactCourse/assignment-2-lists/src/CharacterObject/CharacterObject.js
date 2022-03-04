import React from 'react'
import './CharacterObject.css'

const CharacterObject = (props) => {
    return ( <div className='CharacterObject'>
                <text  onClick={props.click}>{props.char}</text>
            </div>)

}

export default CharacterObject;