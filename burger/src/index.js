import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import OrdersReducer from './store/Reducers/ordersReducer'
import SignInReducer from './store/Reducers/signInReducer'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers(
  {
    Orders : OrdersReducer,
    SignIn : SignInReducer
  })
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));



ReactDOM.render(
  <Provider store= {store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
