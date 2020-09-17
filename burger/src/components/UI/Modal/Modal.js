import React from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {

    return (
    <React.Fragment>
        <div className={classes.Modal} style={{transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
                                                opacity : props.show ? '1' : '0'}}>
            {props.children}
        </div>
        <Backdrop click={props.clickBackdrop} show={props.show}/>
    </React.Fragment>
    )
}

export default Modal