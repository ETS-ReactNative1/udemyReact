import {React} from 'react'
import {Route, Link} from 'react-router-dom'
import Courses from './containers/Courses/Courses'
import Users from './containers/Users/Users'
import classes from './Site.css'


const site = (props) => (

    <div className={classes.Site}>
        <header>
            <nav>
            <ul>
                <li><Link to='usrs'>Users  </Link></li>
                <li><Link to='crsewrk'>  Courses</Link></li>
            </ul>
            </nav>
        </header>
        <Route path='/usrs' render={()=><Users/>} exact/>
        <Route path='/crsewrk' render={() =><Courses/>} exact/>
    </div>
)


export default site