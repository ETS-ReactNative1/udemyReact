import React from 'react'
import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'

const navItems = (props) => {
	return (
        <ul className={classes.navItems}>
            <li><NavItem active link="/">Burger</NavItem></li>
            <li><NavItem active link="/">No where else</NavItem></li>
        </ul>
	)
}

export default navItems