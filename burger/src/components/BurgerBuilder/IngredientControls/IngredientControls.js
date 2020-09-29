import React from 'react'
import IngredientControl from './IngredientControl/IngredientControl'
import { BurgerOptions } from '../IngredientTypes'
import classes from './IngredientControls.module.css'

const ingredientControls = (props) => {
    let possibleIngredients = BurgerOptions.map((ingredient,index) =>{
        return (<IngredientControl key={index} ingredient={ingredient}/>)
        })

    return (
        <div className={classes.IngredientControls}>
            <h3 className={classes.Label}>Total: <strong>${props.totalCost}</strong></h3>
            {possibleIngredients}
            <button className={classes.OrderButton} 
                disabled={props.orderDisabled} 
                onClick={props.order}>ADD TO ORDER</button>
        </div>
    )
}

export default ingredientControls