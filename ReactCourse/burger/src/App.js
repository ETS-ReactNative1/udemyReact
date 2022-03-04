import React from 'react';
import Layout from './components/LayoutContianer/Layout'
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import {Switch, Route} from 'react-router-dom'
import OrderCompletePage from './components/OrderCompletePage/OrderCompletePage';
import SignInPage from './components/Authentication/Sign_In_OnPage'

function App() {
  return (
    <Layout>
      <Switch>
        <Route from='/orders' component={OrderCompletePage}/>
        <Route from='/signin' component={SignInPage}/>
        <Route from='/' component={BurgerBuilder}/>
        
      </Switch>
    </Layout>
  );
}

export default App;
