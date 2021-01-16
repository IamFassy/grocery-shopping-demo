import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Router from './router/Router';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { Provider } from 'react-redux';
import { store } from './reduxcomponents/Store/Store';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(

    <Provider store={store} >
        <Router>
            <App />
        </Router>

    </Provider>


    ,
    document.getElementById('root')
);

module.hot.accept();