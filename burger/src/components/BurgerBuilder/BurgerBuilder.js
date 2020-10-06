import React, {Component} from 'react'
import * as Ingredient from '../../store/IngredientTypes.ts'
import VisualBurger from './VisualBurger/VisualBurger'
import IngredientControls from './IngredientControls/IngredientControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from './OrderSummary/OrderSummary';
import Button from '../UI/Button/Button'
import axios_order_instance from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner'
import WithErrorHandler from '../../HOC/WithErrorHandler'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Actions from '../../store/action'

class BurgerBuilder extends Component {

    state = {
        busy: false
    };

    constructor (props) {
        super();
        this.setState({busy: true})
        props.SetCartOpen(false)

        if(!props.setupComplete)
        {
            axios_order_instance.get('/cart.json')
            .then(getResponse => {
                let neworders = []
                let newHash = null

                Object.keys(getResponse.data).forEach(hash => {
                    newHash = hash;
                    Object.keys(getResponse.data[hash].Burgers).forEach(burgerKey =>{
                        let burgerOrder = getResponse.data[hash].Burgers[burgerKey]
                        neworders.push({ingredients: burgerOrder.Ingredients, cost: Ingredient.GetCostOfOrder(burgerOrder.Ingredients)})
                
                    })
                })
                

                this.setState({busy:false})

                props.AddWebBurgers(neworders,newHash)
                props.CompleteSetup()
            })
            .catch(getError => console.log(getError),
                                this.setState({busy: false}))
        }
    }

    GetCount = (ingredient) =>{
        let ingFilter = this.props.currentOrderIngredients.filter(item => item === ingredient)

        if(ingFilter == null) {
            return 0
        }

        return ingFilter.length
    }

    AddCurrentBurgerToOrder = () => {
        
        if(!this.state.busy)
        {
            this.setState({busy:true})
        }

        const cost = Ingredient.GetCostOfOrder(this.props.currentOrderIngredients);

        const jsonBurger = {
                    Ingredients: this.props.currentOrderIngredients,
                    Cost: cost
                }
        this.props.AddCurrentBurgerToOrder(this.props.currentOrderIngredients, cost)


        if(this.props.orderNumber !== null){
            axios_order_instance.get('/cart/' + this.props.orderNumber +'.json')
            .then(response => {
                let orders = response.data.Burgers
                orders.push(jsonBurger)
                

                axios_order_instance.patch('/cart/' + this.props.orderNumber +'/.json', {'Burgers':orders, 'Total':(response.data.Total+cost)})
                .then(() => this.setState({busy:false})
                )
                .catch(error => {this.setState({busy:false})
                                console.log(error)})                   
            
            })
            .catch(this.setState({busy:false}))

          
        }
        else {
            axios_order_instance.post('/cart.json', {
                Burgers: [jsonBurger],
                Total: cost
            })
            .then(response => {
                this.setState({busy:false})
                this.props.AddWebBurgers(this.props.orders,response.data.name)
            })
            .catch(error => {this.setState({busy:false})
                            console.log(error)}) 
        }
    }

    render () {

        let orderModal = null
        if(this.state.busy)
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
        currentOrderIngredients : reducerState.currentorder,
        orders : reducerState.orders,
        orderNumber : reducerState.orderNumber,
        cartOpen : reducerState.cartOpen,
        setupComplete : reducerState.burgerSetupComplete
    }
}

const reducerDispatchToProps = reducerDispatch => {
    return {
        AddCurrentBurgerToOrder : (ing, cost) => reducerDispatch({type:Actions.AddCurrentBurgerToOrder, order:{ingredients: ing, cost:cost }}),
        AddWebBurgers : (orders,hash) => reducerDispatch({type: Actions.SetOrdersFromWeb, webOrders: orders, hash: hash}),
        ClearCart: () => reducerDispatch({type:Actions.ClearCart}),
        SetCartOpen: (openStatus) => reducerDispatch({type:Actions.SetCartOpen, cartOpenStatus:openStatus}),
        CompleteSetup : () => reducerDispatch({type:Actions.BurgerSetupComplete})


    }
}

export default connect(reducerStateToProps, reducerDispatchToProps)( WithErrorHandler(BurgerBuilder, axios_order_instance))