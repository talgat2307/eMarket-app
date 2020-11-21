import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';
import Products from './containers/Products';
import Login from './containers/Login';
import Register from './containers/Register';
import AddProduct from './containers/AddProduct';
import ProductDetails from './containers/ProductDetails';
import ProductsByCategory from './containers/ProductsByCategory';

const App = () => (
  <div className="App">
    <Layout>
      <Switch>
        <Route path='/' exact component={Products}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path={'/add-product'} component={AddProduct} />
        <Route path={'/products/:id'} component={ProductDetails} />
        <Route path={'/products'} component={ProductsByCategory} />
      </Switch>
    </Layout>
  </div>
);

export default App;
