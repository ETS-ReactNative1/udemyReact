import React, { Component } from 'react'
import classes from  './Layout.module.css'
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
import CartContext from '../../contexts/cart-Context';

class Layout extends Component{

    state = {
        sidebarOpen: false,
        cartOpen : false
    };

    toggleSideBar = () => {
        const lastSideBarState = this.state.sidebarOpen;

        this.setState({sidebarOpen: !lastSideBarState})
    }

    setCartOpen = (newCartOpen) => {

        if(this.state.cartOpen !== newCartOpen)
        {
            this.setState({cartOpen : newCartOpen})
        }
    }

    render () {

        return(
            <CartContext.Provider value={{setCartOpen:this.setCartOpen, cartOpen:this.state.cartOpen}}>
                <SideDrawer open={this.state.sidebarOpen} backdropClick={this.toggleSideBar}/>
                <Toolbar MenuClicked={this.toggleSideBar}/>
                <main className={classes.Content}>{this.props.children}</main>
            </CartContext.Provider>
        )
        }

}

export default Layout