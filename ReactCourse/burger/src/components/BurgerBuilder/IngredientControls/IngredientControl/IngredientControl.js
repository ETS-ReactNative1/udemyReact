import React, { Component } from 'react'
import classes from './IngredientContol.module.css'
import {connect} from 'react-redux'
import * as Actions from '../../../../store/actions/allActionFunctions'
import * as Ingredient from '../../../../store/IngredientTypes'

class IngredientControl extends Component {


    render () {

        let type = this.props.ingredient.Type
        let count = Ingredient.GetCountOnOrder(this.props.currentOrder, type)

        return (
            <ul className={classes.horizontal+ ' ' +classes.IngredientControl}>
                <li className={classes.Label}>{this.props.ingredient.Name + ': $'+ this.props.ingredient.Cost.toFixed(2)}</li>
                <li>
                    <button className={classes.Less} disabled={count<=0} onClick={() => this.props.decreaseIng(this.props.ingredient.Type)}>Less</button>
                </li>
                <li>{Ingredient.GetCountOnOrder(this.props.currentOrder,this.props.ingredient.Type)}</li>
                <li>
                    <button className={classes.More}  onClick={()=> this.props.increaseIng(this.props.ingredient.Type)}>More</button>
                </li>
            </ul>
        )
    }
}

const StateToProps = reducerState => {
    return {
        currentOrder : reducerState.Orders.currentorder
    }
}

const DispatcherToProps = reducerDispatcher => {
    return{
        increaseIng : (ingType) => reducerDispatcher(Actions.increaseIngredient(ingType)),
        decreaseIng : (ingType) => reducerDispatcher(Actions.decreaseIngredient(ingType))
    }
}

export default connect(StateToProps,DispatcherToProps)(IngredientControl)