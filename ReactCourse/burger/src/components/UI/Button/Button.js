import React from 'react'
import classes from './Button.module.css'

const button = (props) => {

    let classArray = [classes.Button];

    if(props.type === "Confirm")
    {
        classArray.push(classes.Success)
    }
    else if(props.type === "Cancel")
    {
        classArray.push(classes.Danger)
    }

    if(props.signin)
    {
        classArray.push(classes.SignIn)
    }

    let disableButton = false
    if(props.disabled)
    {
        disableButton = true
    }

    return (
        <button disabled={disableButton} className={classArray.join(' ')} onClick={props.click} style={props.style}>{props.children}</button>
    )
}

export default button