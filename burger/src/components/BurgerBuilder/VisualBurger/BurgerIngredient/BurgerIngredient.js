import {IngredientTypes} from '../../../../store/IngredientTypes.ts'
import classes from './BurgerIngredient.module.css'
import PropTypes from 'prop-types'
import React, {Component } from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../../../store/action'

class burgerIngredient extends Component {

    render() {
    let className = classes.Ingredient + ' '

    switch(this.props.type) {
            case IngredientTypes.TopBun:

                className +=classes.BreadTop

                return ( 
                    <div className={className}>
                        <div className = {classes.Seeds1}/>
                        <div className = {classes.Seeds2}/>
                    </div>
                );
            case IngredientTypes.BottomBun:
                className +=classes.BreadBottom
                return <div className={className}/>
            case IngredientTypes.Meat:
                className += classes.Meat
                break
            case IngredientTypes.Cheese:
                className += classes.Cheese
                break
            case IngredientTypes.Lettuce:
                className += classes.Salad
                break
            case IngredientTypes.Bacon:
                className += classes.Bacon
                break
            default :
                return null
        }

        return (
            <div className={className} onDoubleClick={() => this.props.removeFromIndex(this.props.index)}/>
        )
    }

}

burgerIngredient.propTypes = {
    type : PropTypes.number
}

const ReducerStateToProps = (reducerState) =>{
    return{}
}

const ReducerDispatchToProps = (reducerDispatch) => {
    return {
        removeFromIndex : (ind) => reducerDispatch({type: Actions.RemoveIngredientFromIndex, index: ind})
    }
}


export default connect(ReducerStateToProps, ReducerDispatchToProps)(burgerIngredient)