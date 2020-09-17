import React from 'react'
import {IngredientTypes} from '../IngredientTypes.ts'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './VisualBurger.module.css'

const visualBurger = (props) => {

    let selectedIngredients = <p>PLEASE! Add some ingredients</p>


    if(props.ingredients.length !== 0) {
        selectedIngredients = props.ingredients.map((ingredient, index) => {
            return (
                <BurgerIngredient  key={index} type={ingredient} index={index}/>
            )
        })
    }

    return (
        <div className={classes.VisualBurger}>
            <BurgerIngredient type={IngredientTypes.TopBun}/>
            {selectedIngredients}
            <BurgerIngredient type={IngredientTypes.BottomBun}/>
        </div>
    )

}

export default visualBurger