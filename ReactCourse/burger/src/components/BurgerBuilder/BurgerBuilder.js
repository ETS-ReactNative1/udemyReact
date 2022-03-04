import React, {Component} from 'react'
import * as Ingredient from '../../store/IngredientTypes.ts'
import VisualBurger from './VisualBurger/VisualBurger'
import IngredientControls from './IngredientControls/IngredientControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from './OrderSummary/OrderSummary';
import Button from '../UI/Button/Button'
import Spinner from '../UI/Spinner/Spinner'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/allActionFunctions'


class BurgerBuilder extends Component {

    constructor (props) {
        super()

        if(!props.setupComplete)
        {
            props.GetWebCartOrders();
        }
    }


    AddCurrentBurgerToOrder = () => {
        const cost = Ingredient.GetCostOfOrder(this.props.currentOrderIngredients);

        const jsonBurger = {
                    ingredients: this.props.currentOrderIngredients,
                    cost: cost
                }
        this.props.AddCurrentBurgerToWebCart(jsonBurger,this.props.orderNumber)
    }

    render () {

        let orderModal = null
        if(this.props.appBusy)
        {
            orderModal = <Spinner/>
        }
        else if (this.props.cartOpen)
        {
            orderModal = ( 
                <React.Fragment>
                    <OrderSummary orders={this.props.orders}/>
                    <Link to={{pathname:'/orders'}}>
                        <Button type="Confirm" disabled={this.props.orderNumber === null}>
                            Purchase
                        </Button>
                    </Link>
                    <Button type="Cancel" click={(ev) => {this.props.SetCartOpen(false)}}>Cancel</Button> 
                </React.Fragment>)
        }

        return (
        <div>
            <VisualBurger ingredients={this.props.currentOrderIngredients}/>
            <Modal show= {this.props.cartOpen} clickBackdrop={(ev) => {this.props.SetCartOpen(false)}}>
                {orderModal}
            </Modal>
            
            <IngredientControls 
                totalCost = {Ingredient.GetCostOfOrder(this.props.currentOrderIngredients).toFixed(2)} 
                orderDisabled={this.props.currentOrderIngredients.length <= 0} 
                order={this.AddCurrentBurgerToOrder}/>
        </div>)
    }
}

const reducerStateToProps = reducerState => {
    return {
        currentOrderIngredients : reducerState.Orders.currentorder,
        orders : reducerState.Orders.orders,
        orderNumber : reducerState.Orders.orderNumber,
        cartOpen : reducerState.Orders.cartOpen,
        setupComplete : reducerState.Orders.burgerSetupComplete,
        appBusy : reducerState.Orders.appBusy
    }
}

const reducerDispatchToProps = reducerDispatch => {
    return {
        AddCurrentBurgerToWebCart : (jsonBurger, orderNumber) => reducerDispatch(Actions.addCurrentBurgerToWebCart(jsonBurger,orderNumber)),
        SetWebBurgers : (orders) => reducerDispatch(Actions.setWebBurgers(orders)),
        SetWebHash : (hash) => reducerDispatch(Actions.setWebHash(hash)),
        SetCartOpen: (openStatus) => reducerDispatch(Actions.setCartOpen(openStatus)),
        GetWebCartOrders :() => reducerDispatch(Actions.getOrdersFromWeb())
    }
}

export default connect(reducerStateToProps, reducerDispatchToProps)( BurgerBuilder)