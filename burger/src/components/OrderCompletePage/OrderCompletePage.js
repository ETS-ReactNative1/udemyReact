import axios_order_instance from '../../axios-orders';
import React, { Component } from 'react';
import VisualBurger from '../BurgerBuilder/VisualBurger/VisualBurger'
import classes from './OrderCompletePage.css'
import cartContext from '../../contexts/cart-Context';
import Button from '../UI/Button/Button'
import {Route} from 'react-router-dom'
import Modal from '../UI/Modal/Modal'
import Spinner from '../UI/Spinner/Spinner'


class OrderCompletePage extends Component {
    state = { 
        serverHashes : [],
        orders: [],
        busy:false
    }

/*    componentDidMount(){
        this.componentDidUpdate()
    }
*/
    componentDidMount () {  
        
            this.setBusy(true)
            axios_order_instance.get('/cart.json')
                .then(getResponse => {
                    console.log(getResponse)
                    let neworders = []
                    let newHashes = []

                    Object.keys(getResponse.data).forEach(hash => {
                        Object.keys(getResponse.data[hash].Burgers).forEach(burgerKey =>{
                            let burgerOrder = getResponse.data[hash].Burgers[burgerKey]
                            neworders.push({ingredients: burgerOrder.Ingredients, cost:burgerOrder.Cost}) })
                        newHashes.push(hash)
                    })
                
                    if(JSON.stringify(this.state.serverHashes) !== JSON.stringify(newHashes)) {
                        this.setState({serverHashes:newHashes, orders:neworders})
                    }
                    
                    this.setBusy(false)
                })
                .catch(getError => {console.log(getError)
                    this.setBusy(false)
                })
    }

    paymentButtonClickedHandler = () => {
        this.props.history.replace('/orders/contact-data')
    }


    purchaseHandler = ( event ) => {
        this.setBusy(true)
        let Total =0
        let jsonBurgers = this.state.orders.map((order, ind) => {
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
            customer: {
                name: 'Maximillion PennyWorth',
                address: {
                    street: 'Teststreet 1',
                    city: 'BurnTown',
                    zipCode: '41351'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios_order_instance.post('/orders.json',jsonPurchase)
        .then( () => {
            this.state.serverHashes.forEach(hash => (
                axios_order_instance.delete('/cart/'+hash+'.json'))
            )
            this.setState({serverHashes:[], orders: []})
            this.props.history.replace('/')
            this.setBusy(false)
        })
        .catch(error=> {
            console.log(error)
            this.setBusy(false)
        });
            
    }

    setBusy = (busyState) => {

        if(this.state.busy!== busyState)
        {
            this.setState({busy: busyState})
        }
    }


    render () {
    
        if (this.state.orders.length === 0 && !this.state.busy) {
            return (
                <cartContext.Consumer>
                    {context => (
                        <h2 {...context.setCartOpen(false)}>Nothing in Cart, so add some burgers first!</h2>
                    )}
                </cartContext.Consumer>
        )}

        let TotalCost = 0;
        let visualOrders = this.state.orders.map((order,index) => {

            TotalCost+= order.cost;
            return(
            <div key={index} style={{width:'310px', display:"inline-block"}}>
                <h3><center><strong>Burger {index+1}: ${order.cost.toFixed(2)}</strong></center></h3>
                <VisualBurger ingredients={order.ingredients}/>
            </div>  
            )
        })
        



        return (
            <cartContext.Consumer>
                {context => (

                    
                    <div {...context.setCartOpen(false)} className={classes.OrderCompletePage}>
                        <Modal show= {this.state.busy}>
                            <Spinner/>
                        </Modal>                        
                        <h2>Order Summary:</h2>
                        <div>
                            {visualOrders}
                        </div>
                        <h2><strong>Total: ${TotalCost.toFixed(2)}</strong></h2>
                        <Button type="Confirm" click={this.paymentButtonClickedHandler}>Enter Payment Info</Button>

                        <Route
                            path={this.props.match.path+'/contact-data'}
                            render={ (props) => (
                                <div className={classes.ContactData}>
                                    <form>
                                        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                                        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                                        <input className={classes.Input} type="text" name="street" placeholder="Street" />
                                        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                                    </form>
                                    <Button type="Confirm" click={this.purchaseHandler}>PURCHASE</Button>
                                </div>)}
                        /> 
                    </div>
                
                )}
            </cartContext.Consumer>
            
        );
    }
}

export default OrderCompletePage;