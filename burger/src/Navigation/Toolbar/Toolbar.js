import React, {Component} from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../components/UI/Logo/Logo'
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton'
import {Link} from 'react-router-dom'
import CartContext from '../../contexts/cart-Context'

class Toolbar extends Component {
    state = {
        cartItems: 0
    }

    render () {
        return(
        <CartContext.Consumer>
            {(context) => (
                <header className={classes.Toolbar}>
                    <HamburgerMenuButton click={this.props.MenuClicked} />
                    <Logo height='40px'/>
                    <div>
                        <button>
                            <Link to={{pathname:'/'}}>Burger Builder</Link>
                        </button>
                        <button onClick={() => {context.setCartOpen(true)}}>Cart</button>
                    </div>
                </header>
            )}
        </CartContext.Consumer>
        )
    }
}

export default Toolbar