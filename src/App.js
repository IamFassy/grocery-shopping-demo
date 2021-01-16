
import React from 'react';
import Home from './pages/Home/Home';
import styles from './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faShoppingCart);

const App = () => {

    return (
        <div className={styles.appContainer}>
            <Home />
        </div>
    )
}

export default App;