import React, { Component } from 'react'
import * as Utilities from '../../Utility/Utility'
import InputElement from '../UI/InputElement/InputElement'
import classes from './Sign_In_OnPage.module.css'
import Button from '../UI/Button/Button'
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/allActionFunctions'
import {Router} from 'react-router-dom'

class SignInOnPage extends Component {

    state= {formData: null,
            formValid: false,
            UseExisting: true}

    componentDidMount (){
        let form = [
            {placeholder: 'Username', type:'input', validationRules:{required:true, isEmail:true}},
            {placeholder: 'Password', type:'input', validationRules: {required:true, isPassword: true}}
        ]

        this.setState({formData : Utilities.createForm(form)})
    }

    inputChangedHandler  = (event, inputIdentifier) => {

        let [updatedForm, updatedFormValid] = Utilities.UpdateFormElement(this.state.formData, inputIdentifier, event.target.value, true)
        this.setState({formData: updatedForm, formValid: updatedFormValid})
    }

    changeLoginState = () => {
        this.props.setErrorText('')
        this.setState({UseExisting : !this.state.UseExisting})
    }

    attemptAction = () => {
        if(this.state.UseExisting) {
            this.props.signIn(
                this.state.formData['Username'].value, 
                this.state.formData['Password'].value)
        }
        else {
            this.props.createNewAccount(
                this.state.formData['Username'].value, 
                this.state.formData['Password'].value)
        }
    }

    render () {

        let elements = Utilities.formToInputElementArray(this.state.formData).map((entry,index) => {
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

        
        let LinkText = "Already a customer? Go to Login"
        if(this.state.UseExisting)
        {
            LinkText = "No Account?  Go to Create Account"
        }

        let errorText = null
        if(this.props.errorActive)
        {
            errorText = <h6>{this.props.errorText}</h6>
        }
        

        return (
            <div className={classes.SignInPanel}>
                {errorText}
                <form >
                    {elements}
                </form>
                <div className={classes.SignInButtonContainer}>
                    <Button type="Confirm" signin click={()=>this.attemptAction()} >{this.state.UseExisting?'Login' :'Create Account'}</Button>
                    <Button style={{fontSize: 10, paddingBottom:'20px'}} type="Cancel" signin click={() => this.changeLoginState()}>{LinkText}</Button>
                </div>
            </div>
        )
    }
}

const StateToProps = reducerState => {
    return {
        errorActive : reducerState.SignIn.errorActive,
        errorText : reducerState.SignIn.errorText,
        authenticated : reducerState.SignIn.authenticated
    }
}

const DispatcherToProps = reducerDispatcher => {
    return{
        signIn : (username, password) => reducerDispatcher(Actions.logInToAccount(username, password)),
        createNewAccount : (username,password) => reducerDispatcher(Actions.createNewAccount(username, password)),
        setErrorText : (text) => reducerDispatcher(Actions.setLogInError(text))
    }
}

export default connect(StateToProps ,DispatcherToProps)(SignInOnPage)