import React from 'react'
import classes from './SideDrawer.module.css'
import NavItems from '../NavItems/NavItems'
import Logo from '../../components/UI/Logo/Logo'
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let classNames= [classes.SideDrawer]
    classNames.push(props.open? classes.Open: classes.Closed)

	return (
        <React.Fragment>
            <Backdrop show={props.open} click={props.backdropClick}/>
            <div className={classNames.join(' ')}>
                <Logo height='75px' />
                <nav>
                    <NavItems/>
                </nav>
            </div>
        </React.Fragment>
	)
}

export default sideDrawer