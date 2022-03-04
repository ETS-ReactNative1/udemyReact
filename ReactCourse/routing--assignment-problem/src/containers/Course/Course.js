import React, { Component } from 'react';

class Course extends Component {

    state = {
        id: null,
        title: null
    }

    componentDidUpdate () {

        if(this.props.location.state == null || 
            this.props.location.state.id == null)
        {
            if(this.state.id != null)
            {
                this.setState({id: null,
                                title: null}) 
            }
        } 
        else if (this.props.location.state.id !== this.state.id)
        {
            this.setState({id: this.props.location.state.id,
                            title: this.props.location.state.title})
        }
    }

    render () {
        let content = <h1>Please Choose a Course</h1>

        if(this.state.id != null && this.state.title != null)
        {
            content = ( 
                        <React.Fragment>
                            <h1>{this.state.title}</h1>
                            <p>You selected the Course with ID: {this.state.id}</p>
                        </React.Fragment>)
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Course;