import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { editCart, httpMethods } from '../../apimanager/Endpoints';
import NetworkManager from '../../apimanager/NetworkManager';
import Checkout from '../../components/Checkout/Checkout';
import Header from '../../components/Header/Header';
import ShoppingDetail from '../../components/ShoppingDetail/ShoppingDetail';
import './Cart.scss'


const Cart = (props) => {


    let dispatch = useDispatch()

    const clearCart = () => {

        // let body = []
        // for (let i = 0; i < props.cartItems.length; i++) {
        //     let arr = {
        //         "product_id": props.cartItems[i].id,
        //         "auth_key": "6c55fa36a2138b23a52e74619bfdae147fa0c3e1",
        //         "quantity": 0
        //     }
        //     body.push(arr)
        // }

        // NetworkManager.request(editCart, httpMethods.post, body)
        //     .then((res) => {
        //         console.log(res, "clear");
        //     })
        //     .catch((err) => {
        //         console.log(err, "err");
        //     })
    }


    return (
        <div className="cart-container">
            <Header cart={true}  />
            <div className="cart-container__body">

                {props.cartItems.length > 0 && <Row>
                    <Col lg="9" md="9">
                        <div className="cart-container__body-left">
                            <Row className="cart-container__body-left-row" >
                                <h4>Shopping Cart</h4>
                                <span>({props.cartItems.length} items)</span>
                                <button onClick={() => clearCart()} type="button" style={{ outline: "none" }} className="cart-container__body-left-row-button">Clear cart</button>
                            </Row>
                            <ShoppingDetail />
                        </div>
                    </Col>
                    <Col lg="3" md="3">
                        <div className="cart-container__body-right">
                            <Checkout items={props.cartItems} />
                        </div>
                    </Col>
                </Row>}
                {props.cartItems.length === 0 && <p style={{ textAlign: "center", marginTop: 10 }}>No cart items found.</p>}



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
