import React from 'react'
import './InputElement.css'


const inputElement = (props) =>{

    let formElement = null
    const inputClasses = ['InputElement']

    if(props.Invalid)
    {
        inputClasses.push('Invalid')
    }

    switch(props.elementType) {
        case('input'):
            formElement = <input 
                        className = {inputClasses.join(' ')}
                        placeholder = {props.placeholder}
                        value = {props.value}
                        onChange ={props.changed}/>
            break;
        case('select'):
            formElement = <select 
                            className={inputClasses.join(' ')}
                            value= {props.value}
                            onChange={props.changed}>
                            {props.options.map(op =>
                                <option key={op} value={op}>
                                    {op}
                              </option>)}
                        </select>
            break;
        default: 
            break;
    }

    if(formElement === null)
    {
        return null
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {formElement}
        </div>
    )
}

export default inputElement
