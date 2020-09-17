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

    return (
        <button className={classArray.join(' ')} onClick={props.click}>{props.children}</button>
    )
}

export default button