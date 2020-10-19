import * as ActionTypes from './actionTypes'
import axios_instance from  '../../axios-orders'
import * as Ingredient from '../../store/IngredientTypes.ts'

export const increaseIngredient = (ingredientType) => {
    return {
        type: ActionTypes.IncreaseIngredient,
        ingType: ingredientType
    }
}

export const decreaseIngredient = (ingredientType) => {
    return {
        type: ActionTypes.DecreaseIngredient,
        ingType: ingredientType
    }
}

export const removeIngredientFromIndex = (index) => {
    return {
        type: ActionTypes.RemoveIngredientFromIndex,
        index: index
    }
}

export const addCurrentBurgerToOrder = (order) => {
    return {
        type: ActionTypes.AddCurrentBurgerToOrder,
        order: order
    }
}

export const setAppBusy = (busy) => {
    return {
        type: ActionTypes.SetAppBusy,
        appBusyStatus: busy
    }
}

export const addCurrentBurgerToWebCart = (jsonBurger,orderNumber) => {
    return (dispatch) => {

        dispatch(setAppBusy(true))
        if(orderNumber !== null){
            axios_instance.get('/cart/' + orderNumber +'.json')
            .then(response => {
                let orders = response.data.Burgers
                orders.push(jsonBurger)
                
                axios_instance.patch('/cart/' + orderNumber +'/.json', 
                    {'Burgers':orders, 
                     'Total':(response.data.Total+jsonBurger.cost)})
                .then(() => {dispatch(setAppBusy(false))
                            dispatch(addCurrentBurgerToOrder(jsonBurger))})
                .catch(error => {dispatch(setAppBusy(false))
                                console.log(error)})                   
            
            })
            .catch(setAppBusy(false))
        }
        else {
            axios_instance.post('/cart.json', {
                Burgers: [jsonBurger],
                Total: jsonBurger.cost
            })
            .then(response => {
                dispatch(setAppBusy(false))
                dispatch(addCurrentBurgerToOrder(jsonBurger))
                dispatch(setWebHash(response.data.name))
            })
            .catch(error => {
                setAppBusy(false)
                console.log(error)}) 
        }
    }
}

export const setWebBurgers = (orders) => {
    return {
        type: ActionTypes.SetOrdersFromWeb,
        webOrders : orders
    }
}

export const setWebHash = (hash) => {
    return {
        type : ActionTypes.SetWebHash,
        webHash : hash
    }
}

export const getOrdersFromWeb = () => {
    return dispatch => {

        dispatch(setAppBusy(true))
        axios_instance.get('/cart.json')
        .then(getResponse => {
            let neworders = []
            let newHash = null

            Object.keys(getResponse.data).forEach(hash => {
                newHash = hash;
                Object.keys(getResponse.data[hash].Burgers).forEach(burgerKey =>{
                    let burgerOrder = getResponse.data[hash].Burgers[burgerKey]
                    neworders.push({ingredients: burgerOrder.ingredients, cost: Ingredient.GetCostOfOrder(burgerOrder.ingredients)})
            
                })
            })
            
            dispatch(setWebHash(newHash))
            dispatch(setWebBurgers(neworders))
            dispatch(setAppBusy(false))
        })
        .catch(getError => {
            console.log(getError)
            dispatch(setAppBusy(false))
        })
    }
}

export const setCartOpen = (openStatus) => {
    return {
        type: ActionTypes.SetCartOpen,
        cartOpenStatus : openStatus
    }
}
