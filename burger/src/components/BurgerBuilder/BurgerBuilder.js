import React, {Component} from 'react'
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
import {Link} from 'react-router-dom'
import cartContext from '../../contexts/cart-Context';


class BurgerBuilder extends Component {

    state = {
        currentOrderIngredients: [IngredientTypes.Meat],
        orders: [],
        busy: false,
        orderNumber: null
    };

    componentDidMount () {
        this.setState({busy: true})
        axios_order_instance.get('/cart.json')
        .then(getResponse => {
            let neworders = []
            let newHash = null

            Object.keys(getResponse.data).forEach(hash => {
                newHash = hash;
                Object.keys(getResponse.data[hash].Burgers).forEach(burgerKey =>{
                    let burgerOrder = getResponse.data[hash].Burgers[burgerKey]
                    neworders.push(burgerOrder.Ingredients) })
            })
        
            
            this.setState({orderNumber:newHash, 
                            orders:neworders,
                            busy:false})
            }
            
        )
        .catch(getError => console.log(getError),
                            this.setState({busy: false}))
    }

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
        
        this.setState({busy:true})
        let ingredientsCopy = [...this.state.currentOrderIngredients]
        let ordersCopy = [...this.state.orders]

        ordersCopy.push(ingredientsCopy);

        let newBurger = [IngredientTypes.Meat]
        this.setState({orders: ordersCopy, currentOrderIngredients:newBurger})

        const cost = this.GetCostPerOrder(ingredientsCopy);
        const jsonBurger = {
                    Ingredients: ingredientsCopy,
                    Cost: cost
                }



        if(this.state.orderNumber !== null){
            axios_order_instance.get('/cart/' + this.state.orderNumber +'.json')
            .then(response => {
                let orders = response.data.Burgers
                orders.push(jsonBurger)
                

                axios_order_instance.patch('/cart/' + this.state.orderNumber +'/.json', {'Burgers':orders, 'Total':(response.data.Total+cost)})
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
            .then(response => this.setState({busy:false,
                                            orderNumber: response.data.name})
            )
            .catch(error => {this.setState({busy:false})
                            console.log(error)}) 
        }
    }

    render () {

        let orderModal = (
            <cartContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <OrderSummary orders={this.state.orders} costs={this.state.orders.map((order) => {return (this.GetCostPerOrder(order))})}/>
                        <Link to={{pathname:'/orders'}}>
                            <Button type="Confirm" disabled={this.state.orderNumber === null}>
                                Purchase
                            </Button>
                        </Link>
                        <Button type="Cancel" click={(ev) => {context.setCartOpen(false)}}>Cancel</Button> 
                    </React.Fragment>)}
            </cartContext.Consumer>)
        if(this.state.busy)
        {
            orderModal = <Spinner/>
        }



        return (
        <cartContext.Consumer>
            {(context => (
                <div>
                    <BurgerIngredientContext.Provider value={{removeFromIndex: this.RemoveIngredientFromIndex}}>
                        <VisualBurger ingredients={this.state.currentOrderIngredients}/>
                    </BurgerIngredientContext.Provider>
                    <IngredientControlContext.Provider value={{increase: this.IncreaseIngredientHandler, decrease: this.DeceaseIngredientHandler, count: this.GetCount }}>
                        <Modal show= {context.cartOpen} clickBackdrop={(ev) => {context.setCartOpen(false)}}>
                            {orderModal}
                        </Modal>
                        
                        <IngredientControls 
                            totalCost = {this.GetCostPerOrder(this.state.currentOrderIngredients).toFixed(2)} 
                            orderDisabled={this.state.currentOrderIngredients.length <= 0} 
                            order={this.AddCurrentBurgerToOrder}/>
                    </IngredientControlContext.Provider>
                </div>
            ))}
        </cartContext.Consumer>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios_order_instance)