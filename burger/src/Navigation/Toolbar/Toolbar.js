import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../components/UI/Logo/Logo'
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton'

const toolbar = (props) => {

    return(
        <header className={classes.Toolbar}>
            <HamburgerMenuButton click={props.MenuClicked} />
            <Logo height='40px'/>
        </header>
    )
}

export default toolbar