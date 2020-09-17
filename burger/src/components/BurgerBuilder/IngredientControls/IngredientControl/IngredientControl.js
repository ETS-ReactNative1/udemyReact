import React from 'react'
import classes from './IngredientContol.module.css'
import ingredientControlContext from '../../../../contexts/ingredientControl-Context'

const IngredientControl = (props) => {


    return (
        <ingredientControlContext.Consumer>
            {(context)=> (
                <ul className={classes.horizontal+ ' ' +classes.IngredientControl}>
                    <li className={classes.Label}>{props.ingredient.Name + ': $'+ props.ingredient.Cost.toFixed(2)}</li>
                    <li>
                        <button className={classes.Less} disabled={context.count(props.ingredient.Type)<=0} onClick={(ev) => context.decrease(ev, props.ingredient.Type)}>Less</button>
                    </li>
                    <li>{context.count(props.ingredient.Type)}</li>
                    <li>
                        <button className={classes.More}  onClick={(ev) => context.increase(ev, props.ingredient.Type)}>More</button>
                    </li>
                </ul>
            )}
        </ingredientControlContext.Consumer>
    )
}

export default IngredientControl