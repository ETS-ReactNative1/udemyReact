import React from 'react'
import './ValidationComponent.css'

const ValidationComponent = (props) => {
    
    if(props.text.length <= 5)
    {
        return (
            <div className='InvalidText'>
                <text>Text too short!</text>
            </div>
        )
    }
    else
    {
        return (
            <div className='ValidText'>
                <text>Text long enough.</text>
            </div>
        )

    }
}

export default ValidationComponent