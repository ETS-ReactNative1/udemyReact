import * as ActionTypes from './actionTypes'
import axios_instance from  '../../axios-orders'
import * as Utility from '../../Utility/Utility'
import * as SignInFuntions from './SignInActionFunctions' 

export const setContactDataFormStructure = (formDescription) => {
    return {
        type : ActionTypes.SetContactDataFormStructure,
        form : Utility.createForm(formDescription)
    }
}

export const setContactData = (inputIdent, inputValue, inputValid ) => {
    return {
        type : ActionTypes.SetContactData,
        inputIdentifier : inputIdent,
        inputValue : inputValue,
        inputValid : inputValid
    }
}

export const clearCart = () => {
    return {
        type : ActionTypes.ClearCart
    }
}


export const purchaseCart = (jsonPurchase, orderHash, idToken) => {
    return (dispatch) => {
        setAppBusy(false)

        let url = 

        axios_instance.post('/orders.json',jsonPurchase)
        .then( () => {
            if(orderHash)
            {
                axios_instance.delete('/cart/'+orderHash+'.json')
                .then( () => {
                    dispatch(clearCart())
                    dispatch(setAppBusy(false))
                    }
                )
                .catch(error => {
                    dispatch(console.log(error))
                    dispatch(setAppBusy(false))
                })
                
            }
        })
        .catch(error=> {
            console.log(error)
            setAppBusy(false)
        });
    }

}

const setAppBusy = (busyStatus) => {
    return {
        type: ActionTypes.SetAppBusy,
        appBusyStatus : busyStatus
    }
}

