import React, {Component} from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../components/UI/Logo/Logo'
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../store/action'


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

        return(
            <header className={classes.Toolbar}>
                <HamburgerMenuButton click={this.props.MenuClicked} />
                <Logo height='40px'/>
                <div>
                    <button>
                        <Link to={{pathname:'/'}}>Burger Builder</Link>
                    </button>
                    <button onClick={() => {this.props.SetCartOpen(true)}}>{CartText}</button>
                </div>
            </header>
        )
    }
}

const reducerStateToProps = reducerState => {
    return {
        orderCount : reducerState.orders.length
    }
}

const reducerDispatchToProps = reducerDispatch => {
    return {
        SetCartOpen: () => reducerDispatch({type:Actions.SetCartOpen, cartOpenStatus: true}) 
    }
}

export default connect(reducerStateToProps, reducerDispatchToProps)(Toolbar)