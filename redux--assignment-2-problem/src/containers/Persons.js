import React, { Component } from 'react';
import  {connect} from 'react-redux'
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';



class Persons extends Component {

    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        this.props.personAddedHandler(newPerson)
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.people.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = reducerState => {
    return {
        people: reducerState.people
    };
};

const mapDispatchToProps = reducerDispatch => {
    return {
        personDeletedHandler: (id) => reducerDispatch({type: 'DEL', id: id}),
        personAddedHandler : (person) => reducerDispatch({type:'ADD', person: person})
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Persons);