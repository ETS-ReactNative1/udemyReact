import React, {Component} from 'react'
import Aux from '../../HOC/AuxiliaryContainter'
import {IngredientTypes, BurgerOptions} from './IngredientTypes.ts'
import VisualBurger from './VisualBurger/VisualBurger'
import IngredientControls from './IngredientControls/IngredientControls';
import IngredientControlContext from '../../contexts/ingredientControl-Context';
import BurgerIngredientContext from '../../contexts/burgerIngredient-Context';
import Modal from '../UI/Modal/Modal';
import OrderSummary from './OrderSummary/OrderSummary';
import Button from '../UI/Button/Button'
import axios_order_instance from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner'
import WithErrorHandler from '../../HOC/WithErrorHandler'


class BurgerBuilder extends Component {

    state = {
        currentOrderIngredients: [IngredientTypes.Meat],
        orders: [],
        purchasing: false,
        busy: false
    };

    IncreaseIngredientHandler = (event,type) => {
        const ingredients =[...this.state.currentOrderIngredients]
        ingredients.push(type)

        this.setState({currentOrderIngredients: ingredients})
    }

    DeceaseIngredientHandler = (event,type) => {
        let ingredients =[...this.state.currentOrderIngredients]
        let i = ingredients.lastIndexOf(type)
        if(i !== -1) {
            ingredients.splice(i,1);
            this.setState({currentOrderIngredients: ingredients})
        }
    }

    RemoveIngredientFromIndex = (event, index) => {
        let ingredientsCopy = [...this.state.currentOrderIngredients]
        if(index<0 || index>=ingredientsCopy.length) {
            return
        }

        ingredientsCopy.splice(index,1)
        this.setState({currentOrderIngredients: ingredientsCopy})
    }

    GetCount = (ingredient) =>{
        let ingFilter = this.state.currentOrderIngredients.filter(item => item === ingredient)

        if(ingFilter == null) {
            return 0
        }

        return ingFilter.length
    }

    GetCountOnOrder = (order, ingredient) =>{
        let ingFilter = order.filter(item => item === ingredient)

        if(ingFilter == null) {
            return 0
        }

        return ingFilter.length
    }    

    GetTotalCost = () => {
        let cost = 0 //base cost before options

        this.state.orders.forEach(order => {
            BurgerOptions.forEach(option => {
                cost += this.GetCountOnOrder(order, option.Type) * option.Cost
            });
        })
        

        return cost;
    }

    GetCostPerOrder =(order) => {
        let cost= 0;
        BurgerOptions.forEach(option => {
            cost += this.GetCountOnOrder(order, option.Type) * option.Cost
        });

        return cost;
    }



    AddCurrentBurgerToOrder = () => {
        let ingredientsCopy = [...this.state.currentOrderIngredients]
        let ordersCopy = [...this.state.orders]

        ordersCopy.push(ingredientsCopy);

        let newBurger = [IngredientTypes.Meat]
        this.setState({orders: ordersCopy, currentOrderIngredients:newBurger})
    }

    PurchasingStartedHandler = () => {
        this.setState({purchasing: true})
    }

    PurchasingCanceledHandler = () => {
        this.setState({purchasing: false})
    }

    PurchasingSucceededHandler = () => {
        this.setState({busy:true})

        const jsonOrders= this.state.orders.map((order,index) => {
            let cost = this.GetCostPerOrder(order);

            return(
                {
                    Ingredients: order,
                    Cost: cost
                }
            )
        })

        let totalCost = this.GetTotalCost();
        const jsonTotalOrder = {
            Burgers: jsonOrders,
            Total: totalCost,
            customer: {
                    name : "Bruce Wayne",
                    deliveryAddress: {
                            street: '1 Bat Rd',
                            city: 'Gotham',
                            country: 'United States',
                            zip: '0655239'
                    },
                    email : 'test@test.com',
            },
            deliveryMethod: 'fast'
        }

        axios_order_instance.post('/orders.json', jsonTotalOrder)
            .then(this.setState({orders : [], 
                                currentOrderIngredients: [IngredientTypes.Meat],
                                busy:false,
                                purchasing:false}))
            .catch(error => {this.setState({busy:false,
                                            purchasing:false})
                            console.log(error)})
        
    }

    render () {

        let orderModal = (
            <React.Fragment>
                <OrderSummary orders={this.state.orders} costs={this.state.orders.map((order) => {return (this.GetCostPerOrder(order))})}/>
                <Button type="Confirm" click={this.PurchasingSucceededHandler}>Purchase</Button>
                <Button type="Cancel" click={this.PurchasingCanceledHandler}>Cancel</Button>
            </React.Fragment>)
        if(this.state.busy)
        {
            orderModal = <Spinner/>
        }

        return (
        <Aux>
            <BurgerIngredientContext.Provider value={{removeFromIndex: this.RemoveIngredientFromIndex}}>
                <VisualBurger ingredients={this.state.currentOrderIngredients}/>
            </BurgerIngredientContext.Provider>
            <IngredientControlContext.Provider value={{increase: this.IncreaseIngredientHandler, decrease: this.DeceaseIngredientHandler, count: this.GetCount }}>
                <Modal show= {this.state.purchasing} clickBackdrop={this.PurchasingCanceledHandler}>
                    {orderModal}
                </Modal>
                
                <IngredientControls 
                    totalCost = {this.GetCostPerOrder(this.state.currentOrderIngredients).toFixed(2)} 
                    orderDisabled={this.state.currentOrderIngredients.length <= 0} 
                    order={this.AddCurrentBurgerToOrder}
                    purchaseDisabled={this.state.orders.length === 0}
                    purchase={this.PurchasingStartedHandler}/>
            </IngredientControlContext.Provider>

        </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, Axios)