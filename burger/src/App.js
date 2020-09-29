import React from 'react';
import Layout from './components/LayoutContianer/Layout'
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import {Switch, Route} from 'react-router-dom'
import OrderCompletePage from './components/OrderCompletePage/OrderCompletePage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route from='/orders' component={OrderCompletePage}/>
        <Route from='/' component={BurgerBuilder}/>
      </Switch>
    </Layout>
  );
}

export default App;
