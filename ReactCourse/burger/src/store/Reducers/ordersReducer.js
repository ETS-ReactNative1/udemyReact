import * as Action from '../actions/actionTypes'
import {IngredientTypes} from '../IngredientTypes'
import * as Utility from '../../Utility/Utility'

const initialState = {
    orders : [],
    currentorder : [IngredientTypes.Meat],
    orderNumber : null,
    contactData : {},
    contactDataValid: false,
    cartOpen: false,
    burgerSetupComplete: false,
    appBusy : false
}

const ordersReducer = (state=initialState, params) => {
    switch(params.type)
    {
        case Action.IncreaseIngredient:
            return Utility.updateObject(state, {
                currentorder : state.currentorder.concat([params.ingType])
            })
        case Action.DecreaseIngredient:
            let ingredients =[...state.currentorder]
            let i = ingredients.lastIndexOf(params.ingType)
            if(i !== -1) {
                ingredients.splice(i,1);
                return Utility.updateObject(state, 
                    {
                        currentorder : ingredients
                    })
            }
            return state
        case Action.RemoveIngredientFromIndex:
            let ingredientsCopy = [...state.currentorder]
            if(params.index<0 || params.index>=ingredientsCopy.length) {
                return state
            }
    
            ingredientsCopy.splice(params.index,1)
            return Utility.updateObject(state, 
                    {
                        currentorder : ingredientsCopy
                    })
        case Action.AddCurrentBurgerToOrder:
            return Utility.updateObject(state, 
                {
                    orders : state.orders.concat([params.order]),
                    currentorder : [IngredientTypes.Meat]
                })
        case Action.SetOrdersFromWeb:
            return Utility.updateObject(state, 
                {
                    orders: params.webOrders,
                    burgerSetupComplete : true  
                })
        case Action.SetWebHash:
            return Utility.updateObject(state, 
                {
                    orderNumber: params.webHash
                })
        case Action.ClearCart:
            return Utility.updateObject(state, 
                {
                    orders: [],
                    orderNumber : null,
                    currentorder: [IngredientTypes.Meat],
                    cartOpen: false
                })
        case Action.SetContactData:
            let [UpdatedForm, UpddatedFormValid ] = Utility.UpdateFormElement(
                state.contactData,
                params.inputIdentifier,
                params.inputValue,
                params.inputValid
            )
            return Utility.updateObject(state, 
                {
                    contactData: UpdatedForm,
                    contactDataValid: UpddatedFormValid
                })
        case Action.SetContactDataFormStructure:
            return Utility.updateObject(state, 
                {
                    contactData: params.form,
                    contactDataValid: false
                })
        case Action.SetCartOpen:
            return Utility.updateObject(state, 
                {
                    cartOpen:params.cartOpenStatus
                })
        case Action.SetAppBusy:
            return Utility.updateObject(state,
                {
                    appBusy: params.appBusyStatus
                })
        default : return state

    }

}

export default ordersReducer