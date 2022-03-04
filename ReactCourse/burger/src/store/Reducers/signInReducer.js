import * as Actions from '../actions/actionTypes'
import * as Utility from '../../Utility/Utility'

const initialState = {
    authenticated : false,
    logInBusy: false,
    errorActive: false,
    idToken: null,
    refreshToken: null,
    errorText: ''
}
const signInReducer = (state = initialState, params) => {
    switch(params.type)
    {
        case Actions.SetLogInTokens:
            return (
                Utility.updateObject( state,
                {
                    idToken: params.idToken,
                    refreshToken: params.refreshToken,
                    authenticated: params.idToken !== null
                })
            )
        case Actions.SetLogInBusy:
            return (
                Utility.updateObject(state, 
                {
                    logInBusy: params.busyState
                })
            )
        case Actions.SetErrorText:
            return (
                Utility.updateObject(state,
                {
                    errorText: params.errorText,
                    errorActive: params.errorText.length > 0
                })
            )

        default: return state
    }
}


export default signInReducer