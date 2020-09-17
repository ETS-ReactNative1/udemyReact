import React from 'react'
import classes from './Logo.module.css'
import BurgerLogo from '../../Assets/burger-logo.png'

const name = (props) => {
    return (
        <div style={{height:props.height}}>
            <div className={classes.Logo}>
                <img src={BurgerLogo} alt="Burger Time" />
            </div>
        </div>
    )
}

export default name