import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../../store/actions/allActionFunctions'
import InputElement from '../../UI/InputElement/InputElement'
import * as Utility from '../../../Utility/Utility'

class ContactData extends Component {
    state={
        formValid : false,
        loading: false
    }

    constructor(props) {
        super();
        let contactForm = [
            {placeholder: 'Name', type:'input', validationRules:{required: true} },
            {placeholder: 'Street', parent:'Address', type:'input', validationRules:{required: true} },
            {placeholder: 'City', parent:'Address', type:'input', validationRules:{required: true} },
            {placeholder: 'Zip Code', parent:'Address', type:'input', validationRules:{required: true, isZip: true} },
            {placeholder: 'Country', parent:'Address', type:'input', validationRules:{required: true} },
            {placeholder: 'Email', type:'input', validationRules:{required: true, isEmail: true} },
            {placeholder: 'Delivery', type:'select', 
                options: ['Fastest', 'Cheapest'], 
                validationRules:{required: true} }
        ]



        props.SetContactDataFormStructure(contactForm)

    }

    checkValidity = (object) => {

        if(!object.validationRules)
        {
            return true;
        }

        if(!object.touched)
        {
            return true
        }
        else if(object.validationRules.required && object.value.trim() === '')
        {
            return false    
        }

        
        if(object.validationRules.isEmail)
        {
            if(object.value.match(/^[^@]+@[^@]+\.\w{3}$/) === null)
            {
                return false
            }
        }

        if(object.validationRules.isZip)
        {
            if(object.value.match(/^\d{5}$/) === null)
            {
                return false
            }
        }

        return true
    }

    inputChangedHandler  = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.props.orderForm}


        let seperatedIdentifier = inputIdentifier.split('.')

        let elementCopy={...updatedOrderForm}
        for(let identifier in seperatedIdentifier)  {
            elementCopy = elementCopy[seperatedIdentifier[identifier]]
        }
        elementCopy.value = event.target.value

        this.props.SetContactData(inputIdentifier, event.target.value, this.checkValidity(elementCopy))
    }

    render () {

        let elements = Utility.formToInputElementArray(this.props.orderForm).map((entry,index) => {
            return(
                <InputElement 
                    key = {index}
                    elementType= {entry.elementType}
                    placeholder= {entry.placeholder}
                    options = {entry.options}
                    value = {entry.value}
                    changed = {(ev)=> this.inputChangedHandler(ev, entry.identifier)}
                    Invalid={!entry.valid}/>
            )

        })

        return (
            <div className='ContactData'>
                {elements}
            </div>
        )

    }
}

const ReducerStateToProps = (reducerState) =>
{
    return {
        orderForm: reducerState.Orders.contactData
    }
}

const ReducerDispatchToProps = (reducerDispatch) => {
    return{
        SetContactData : (identifier, value, valid ) => reducerDispatch(Actions.setContactData(identifier, value, valid)),
        SetContactDataFormStructure : (form) => reducerDispatch(Actions.setContactDataFormStructure(form))
    }
}

export default connect(ReducerStateToProps,ReducerDispatchToProps)(ContactData);

