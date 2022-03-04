import React from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import Courses from './containers/Courses/Courses'
import Users from './containers/Users/Users'
import './Site.css'

//<Redirect from='/all-courses' to='/coursework' exact/>
const site = (props) => (

    <div className='Site'>
        <header>
            <nav>
            <ul>
                <li><Link to='users'>Users  </Link></li>
                <li><Link to='coursework'>  Courses</Link></li>
            </ul>
            </nav>
        </header>
        <Switch>
            <Route path='/users' component={Users} exact/>
            <Route path='/coursework' component={Courses} exact/>
            {/*<Route path='/:id' component={Courses} exact/>*/}
            <Redirect from='/all-courses' to='/coursework' exact/>
            <Route render= {() => <h1>Site Not Found.  Check route.</h1>} />
        </Switch>


    </div>
)


export default site