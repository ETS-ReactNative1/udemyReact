import React from 'react'
import {IngredientTypes} from '../../IngredientTypes.ts'
import classes from './BurgerIngredient.module.css'
import PropTypes from 'prop-types'
import burgerIngredientContext from '../../../../contexts/burgerIngredient-Context'

const burgerIngredient = (props) => {
    let className = classes.Ingredient + ' '

    switch(props.type) {
        case IngredientTypes.TopBun:
            return ( 
                <div className={className+classes.BreadTop}>
                    <div className = {classes.Seeds1}/>
                    <div className = {classes.Seeds2}/>
                </div>
            );
        case IngredientTypes.BottomBun:
            return <div className={className+classes.BreadBottom}/>
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
        <burgerIngredientContext.Consumer>
            {(context) => (
                <div className={className} onDoubleClick={(ev) => context.removeFromIndex(ev, props.index)}/>
            )}
        </burgerIngredientContext.Consumer>
    )

}

burgerIngredient.propTypes = {
    type : PropTypes.number
}

export default burgerIngredient