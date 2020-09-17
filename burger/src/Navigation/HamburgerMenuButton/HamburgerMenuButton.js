import React from 'react'
import classes from './HamburgerMenuButton.module.css'

const name = (props) => {
	return (
        <div className={classes.HamburgerMenuButton}>
            <button className={classes.button} onClick={props.click}>
                <div className={classes.HamburgerMenuButtonInner}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </button>
        </div>
	)
}

export default name