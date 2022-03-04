import React, { Component } from 'react'
import classes from  './Layout.module.css'
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        sidebarOpen: false
    }

    toggleSideBar = () => {
        const lastSideBarState = this.state.sidebarOpen;

        this.setState({sidebarOpen: !lastSideBarState})
    }


    render () {

        return(
            <div>
                <SideDrawer open={this.state.sidebarOpen} backdropClick={this.toggleSideBar}/>
                <Toolbar MenuClicked={this.toggleSideBar}/>
                <main className={classes.Content}>{this.props.children}</main>
            </div>
        )
        }

}

export default Layout