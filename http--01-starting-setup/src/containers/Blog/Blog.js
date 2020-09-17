import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        {/*Header Page Map*/}
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                {/*This will define what is shown for the given links*/}
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />*/}
            </div>
        );
    }
}

export default Blog;