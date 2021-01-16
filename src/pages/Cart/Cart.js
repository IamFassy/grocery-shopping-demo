import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import './Cart.scss'


const Cart = (props) => {

    const [error, setError] = useState()

    let dispatch = useDispatch()


    return (
        <div className="cart-container">
            <Header />
            <div className="cart-container__body">

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.product.cartItems
    }
}

export default connect(mapStateToProps)(Cart)
