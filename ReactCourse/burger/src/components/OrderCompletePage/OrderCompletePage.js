import axios_order_instance from '../../axios-orders';
import React, { Component } from 'react';
import VisualBurger from '../BurgerBuilder/VisualBurger/VisualBurger'
import classes from './OrderCompletePage.css'
import Button from '../UI/Button/Button'
import {Route} from 'react-router-dom'
import Modal from '../UI/Modal/Modal'
import Spinner from '../UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/allActionFunctions'
import ContactData from '../../components/OrderCompletePage/ContactData/ContactData'


class OrderCompletePage extends Component {

    contactDataButtonClickedHandler = () => {
        this.props.history.replace('/orders/contact-data')
    }


    purchaseHandler = ( event ) => {
        let Total =0
        let jsonBurgers = this.props.orders.map((order, ind) => {
            Total += order.cost
            return (
                {
                    ingredients: order.ingredients,
                    cost: order.cost
                }
            )})


    

        let jsonPurchase = {
            burgers: jsonBurgers,
            total : Total,
            customer: this.props.contactData
        }

        this.props.PurchaseCart(jsonPurchase, this.props.orderHash, this.props.idToken)
        
        this.props.history.replace('/')
    }


    render () {
    
        if (this.props.orders.length === 0 && !this.props.appBusy) {
            return (
                    <h2>Nothing in Cart, so add some burgers first!</h2>
                )
        }

        let TotalCost = 0;
        let visualOrders = this.props.orders.map((order,index) => {

            TotalCost+= order.cost;
            return(
            <div key={index} style={{width:'310px', display:"inline-block"}}>
                <h3><center><strong>Burger {index+1}: ${order.cost.toFixed(2)}</strong></center></h3>
                <VisualBurger ingredients={order.ingredients}/>
            </div>  
            )
        })
        



        return (
            <div  className={classes.OrderCompletePage}>
                <Modal show= {this.props.appBusy}>
                    <Spinner/>
                </Modal>                        
                <h2>Order Summary:</h2>
                <div>
                    {visualOrders}
                </div>
                <h2><strong>Total: ${TotalCost.toFixed(2)}</strong></h2>
                <Button type="Confirm" click={this.contactDataButtonClickedHandler}>Enter Payment Info</Button>
                <Route path='/orders/contact-data' render={ () =>
                    <div>
                        <ContactData/>
                        <Button disabled={!this.props.contactDataFormValid} type="Confirm" click={this.purchaseHandler}>Complete Payment</Button>
                </div>}/>
            </div>
        );
    }
}

const ReducerStateToProps = (reducerState) =>
{
    return {
        orders: reducerState.Orders.orders,
        orderHash: reducerState.Orders.orderNumber,
        contactData : reducerState.Orders.contactData,
        contactDataFormValid : reducerState.Orders.contactDataValid,
        appBusy : reducerState.Orders.appBusy,
        idToken : reducerState.SignIn.idToken
    }
}

const ReducerDispatchToProps = (reducerDispatch) => {
    return{
        ClearCart : () => reducerDispatch(Actions.clearCart()),
        PurchaseCart : (jsonPurchase, orderHash) => reducerDispatch(Actions.purchaseCart(jsonPurchase,orderHash))
    }
}

export default connect(ReducerStateToProps,ReducerDispatchToProps)(OrderCompletePage);