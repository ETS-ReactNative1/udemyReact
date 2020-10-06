import * as Action from './action'
import {IngredientTypes} from './IngredientTypes'

const initialState = {
    orders : [],
    currentorder : [IngredientTypes.Meat],
    orderNumber : null,
    contactData : {},
    contactDataValid: false,
    cartOpen: false,
    burgerSetupComplete: false
}

const reducer = (state=initialState, params) => {
    switch(params.type)
    {
        case Action.IncreaseIngredient:
            return {
                ...state,
                currentorder : state.currentorder.concat([params.ingType])
            }
        case Action.DecreaseIngredient:
            let ingredients =[...state.currentorder]
            let i = ingredients.lastIndexOf(params.ingType)
            if(i !== -1) {
                ingredients.splice(i,1);
                return {
                    ...state,
                    currentorder : ingredients
                }
            }
            return state
        case Action.RemoveIngredientFromIndex:
            let ingredientsCopy = [...state.currentorder]
            if(params.index<0 || params.index>=ingredientsCopy.length) {
                return state
            }
    
            ingredientsCopy.splice(params.index,1)
            return {
                ...state,
                currentorder: ingredientsCopy
            }
        case Action.AddCurrentBurgerToOrder:
            return {
                ...state,
                orders : state.orders.concat([params.order]),
                currentorder : [IngredientTypes.Meat] 
            }
        case Action.SetOrdersFromWeb:
            return {
                ...state,
                orders: params.webOrders,
                orderNumber:params.hash   
            }
        case Action.ClearCart:
            return {
                ...state,
                orders: [],
                orderNumber : null,
                currentorder: [IngredientTypes.Meat]
            }
        case Action.SetContactData:
            const updatedOrderForm = {...state.contactData}


            let seperatedIdentifier = params.inputIdentifier.split('.')
    
            let elementCopy={...updatedOrderForm}
            for(let identifier in seperatedIdentifier)  {
                elementCopy = elementCopy[seperatedIdentifier[identifier]]
            }
    
            elementCopy.value = params.value
            elementCopy.valid = params.valid
            elementCopy.touched = true
    
            let formValid = true;
            if(params.valid === false) {
                formValid = false

            }
            else{
                for(let key in updatedOrderForm)
                {
                    if(!formValid)
                    {
                        break;
                    }

                    let element= updatedOrderForm[key]
                    if(element.isParent)
                    {
                        
                        for(let parentkey in element)
                        {
                            if(parentkey === 'isParent')
                                continue;
        
                            let childElement = element[parentkey]
                            if(!childElement.valid || !childElement.touched) {
                                formValid = false
                                break;
                            }
                        }
                    }
                    else
                    {
                        if(!element.valid || !element.touched)
                        {
                            formValid = false
                            break;
                        }
                    }
        
                }
            }


            return{
                ...state,
                contactData: updatedOrderForm,
                contactDataValid: formValid
            }
        case Action.SetContactDataFormStructure:
            return{
                ...state,
                contactData: params.form,
                contactDataValid: false
            }
        case Action.SetCartOpen:
            return{
                ...state,
                cartOpen:params.cartOpenStatus
            }
        case Action.BurgerSetupComplete:
            return {
                ...state,
                burgerSetupComplete:true
            }

        default : return state

    }

}

export default reducer