import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../../store/action'
import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'
import axios_order_instance from '../../../axios-orders'
import classes from './ContactData.css'
import { create} from 'typescript'
import InputElement from '../InputElement/InputElement'
import { SetContactDataFormStructure } from '../../../store/action'

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

        let form = {}
        contactForm.forEach( entry => {     
            
            let parent = form;   
            if(entry.parent){
                if( !form[entry.parent]){
                    form[entry.parent] = {isParent:true}
                }

                parent = form[entry.parent]
            }

            switch(entry.type)
            {
                case 'input':
                    parent[entry.placeholder] = {
                        elementType : 'input',
                        elementConfig : {
                            type: 'text',
                            placeholder : entry.placeholder
                        },
                        value : '',
                        valid : true,
                        touched : false,
                        validationRules: entry.validationRules
                    }
                    break;
                case 'select':
                    parent[entry.placeholder] = {
                        elementType : 'select',
                        elementConfig : {
                            options: entry.options
                        },
                        value : '',
                        valid : true,
                        touched : true,
                        validationRules: entry.validationRules
                    }
                    break;
                default: break;
            }
        })

        props.SetContactDataFormStructure(form)

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
        let  identifier = ""
        let InputElements = [];
        for(let key in this.props.orderForm)
        {
            identifier = key;
            let element= this.props.orderForm[key]
            if(element.isParent)
            {
                
                for(let parentkey in element)
                {
                    if(parentkey === 'isParent')
                        continue;

                    let childElement = element[parentkey]
                    let childIdentifier = identifier+'.'+parentkey

                    InputElements.push(
                        {
                            elementType:childElement.elementType,
                            placeholder: childElement.elementConfig.placeholder,
                            options:childElement.elementConfig.options,
                            value:childElement.value,
                            identifier : childIdentifier,
                            valid: childElement.valid
                        })
                }
            }
            else
            {
                InputElements.push(
                    {
                        elementType:element.elementType,
                        placeholder: element.elementConfig.placeholder,
                        label: element.elementConfig.placeholder,
                        options:element.elementConfig.options,
                        value:element.value,
                        identifier : identifier,
                        valid: element.valid
                    })
            }

        }

        let elements = InputElements.map((entry,index) => {
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
            <div className='ContactDaata'>
                {elements}
            </div>
        )

    }
}

const ReducerStateToProps = (reducerState) =>
{
    return {
        orderForm: reducerState.contactData
    }
}

const ReducerDispatchToProps = (reducerDispatch) => {
    return{
        SetContactData : (identifier, value, valid ) => reducerDispatch({type:Actions.SetContactData, inputIdentifier:identifier, value:value, valid:valid }),
        SetContactDataFormStructure : (form) => reducerDispatch({type:Actions.SetContactDataFormStructure, form:form})
    }
}

export default connect(ReducerStateToProps,ReducerDispatchToProps)(ContactData);

