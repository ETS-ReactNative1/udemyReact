import React, {Component} from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../components/UI/Logo/Logo'
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/allActionFunctions'


class Toolbar extends Component {
    state = {
        cartItems: 0
    }

    
    render () {
        let CartText = 'Cart'
        if(this.props.orderCount !== 0)
        {
            CartText = 'Cart(' + this.props.orderCount+')'
        }

        let profileButton = <button><Link to={{pathname:'/signin'}}>Sign On</Link> </button>
        if(this.props.authenticated)
        {
            profileButton = <button onClick={() => this.props.LogOut()}>Sign Off</button>
        }
        return(
            <header className={classes.Toolbar}>
                <HamburgerMenuButton click={this.props.MenuClicked} />
                <Logo height='40px'/>
                <div>
                    <button>
                        <Link to={{pathname:'/'}}>Burger Builder</Link>
                    </button>
                    <button onClick={() => {this.props.SetCartOpen(true)}}>{CartText}</button>
                    {profileButton}
                </div>
            </header>
        )
    }
}

const reducerStateToProps = reducerState => {
    return {
        orderCount : reducerState.Orders.orders.length,
        authenticated : reducerState.SignIn.authenticated
    }
}

const reducerDispatchToProps = reducerDispatch => {
    return {
        SetCartOpen: () => reducerDispatch(Actions.setCartOpen(true)),
        LogOut : () => reducerDispatch(Actions.logOut())
    }
}

export default connect(reducerStateToProps, reducerDispatchToProps)(Toolbar)