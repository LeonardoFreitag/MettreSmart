import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Provider from '../pages/Provider';
import Groups from '../pages/Groups';
import Products from '../pages/MenuProducts';
import ProductsDetail from '../pages/ProductDetail';
import Request from '../pages/Request';
import Checkout from '../pages/Checkout';
import Success from '../pages/Success';
import CombinedProducts from '../pages/CombinedProducts';
import CombinedOrder from '../pages/CombinedOrder';
import LoadStorage from '../pages/LoadStorage';
import CombinedEdge from '../pages/CombinedEdge';
import Entregas from '../pages/Entregas';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/entregador" component={Entregas} />
    <Route path="/" exact component={Login} />
    <Route path="/provider/:idProvider" component={Provider} />
    <Route path="/groups" component={Groups} />
    <Route path="/products" component={Products} />
    <Route path="/productDetail" component={ProductsDetail} />
    <Route path="/request" component={Request} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/success" component={Success} />
    <Route path="/combinedProducts" component={CombinedProducts} />
    <Route path="/combinedOrder" component={CombinedOrder} />
    <Route path="/combinedEdge" component={CombinedEdge} />
    <Route path="/loadStorage" component={LoadStorage} />
  </Switch>
);

export default Routes;
