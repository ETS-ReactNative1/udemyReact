import React from 'react'
import {BurgerOptions } from '../../../store/IngredientTypes'

const orderSummary = (props) => {
    let totalCost = 0;
    const OrderList = props.orders.map(
        (order, i) => {

            totalCost += order.cost
            return ( 
                <div key={i}>
                    <strong> Burger #{i+1}:&nbsp;&nbsp; ${order.cost.toFixed(2)}</strong>
                    <ul>
                        {
                            BurgerOptions.map((ing,j)=>{
                            if(order.ingredients.includes(ing.Type)) {
                                return (
                                    <li key ={j}>{ing.Name}: {order.ingredients.filter((ordering)=> ordering === ing.Type).length}</li>
                                )
                            }
                            return null
                        })}
                    </ul>
                </div>
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