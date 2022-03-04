import * as ActionTypes from './actionTypes'
import axios_instance from '../../axios-orders'
import * as Utility from '../../Utility/Utility'

const API_KEY = 'AIzaSyD-PFV7hfOI1zeutZQY5Wn9DvNL-mTrdR0'

export const createNewAccount = (email, password) => {
    return (dispatch) => {
        dispatch(setLogInBusy(true))

        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+API_KEY
        axios_instance.post(url, payload)
        .then(response => {
            dispatch(setLogInBusy(false))
            dispatch(logInToAccount(email, password))
            })
        .catch(error => {
            dispatch(setLogInBusy(false))
            console.log(error)
            dispatch(setLogInError('Account Exists.  Go to Login'))
        })


    }
}

// export const refreshAccount = (refresh_Token) => {

//     return (dispatch) => {

//         dispatch(setLogInBusy(true))
//         let url = 'https://securetoken.googleapis.com/v1/token?key=' + API_KEY



//         const payload = {
//             rant_type: "refresh_token",
//             refresh_token: props.refresh_token
//         }

//         axios_instance.post(url, payload)
//             .then((response) => {
//                 dispatch(setLogInTokens(response.data.localId,
//                     response.data.refreshToken,
//                     (new Date()).getTime() + (new Date(response.data.expiresIn)).getTime()))
//                 dispatch(setLogInBusy(false))
//             })
//             .catch((error) => {
//                 console.log(error)
//                 dispatch(setLogInBusy(false))
//             })

//     }
// }

export const logInToAccount = (email,password) => {
    return (dispatch) => {
        setLogInBusy(true)

        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+API_KEY
    
        axios_instance.post(url,payload)
        .then((response) => {

            dispatch(setLogInTokens(response.data.localId,
                    response.data.refreshToken,
                    (new Date()).getTime()+(new Date(response.data.expiresIn)).getTime()))

            dispatch(setLogInBusy(false))
        })
    }
}



export const setLogInBusy = (busyState) =>{
    return {
        type: ActionTypes.SetLogInBusy,
        busyState: busyState
    }
}

export const setLogInError = (errorText) => {
    return {
        type: ActionTypes.SetErrorText,
        errorText : errorText
    }
}

export const setLogInTokens = (idToken, refreshToken, expirationTime) => {
    return {
        type: ActionTypes.SetLogInTokens,
        idToken : idToken,
        refreshToken : refreshToken,
        expiresIn : expirationTime
    }
}

export const logOut = () => {
    return setLogInTokens(null, null, 0)
}