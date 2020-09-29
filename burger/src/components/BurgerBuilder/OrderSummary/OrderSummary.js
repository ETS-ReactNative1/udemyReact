import React from 'react'
import BurgerIngredientContext from '../../../contexts/burgerIngredient-Context'
import {BurgerOptions } from '../IngredientTypes'

const orderSummary = (props) => {
    let totalCost = 0;
    const OrderList = props.orders.map(
        (order, i) => {

            totalCost += props.costs[i]
            return (
                <BurgerIngredientContext.Consumer key={i}>
                {(context) => (  
                    <div>
                        <strong> Burger #{i+1}:&nbsp;&nbsp; ${props.costs[i].toFixed(2)}</strong>
                        <ul>
                            {
                                BurgerOptions.map((ing,j)=>{
                                if(order.includes(ing.Type)) {
                                    return (
                                        <li key ={j}>{ing.Name}: {order.filter((ordering)=> ordering === ing.Type).length}</li>
                                    )
                                }
                                return null
                            })}
                        </ul>
                    </div>
                )}  
                </BurgerIngredientContext.Consumer>
            )
        }
    )


    return (
        <React.Fragment>
            <ul>
                {OrderList}
            </ul>
            <h3><strong>TOTAL:&nbsp;{totalCost.toFixed(2)}</strong></h3>
        </React.Fragment>
    )
}

export default orderSummary