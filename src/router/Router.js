import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cart from '../pages/Cart/Cart';
import App from '../App';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/cart" component={Cart} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router


