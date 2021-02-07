import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Checkout from '../../components/Checkout/Checkout';
import Header from '../../components/Header/Header';
import ShoppingDetail from '../../components/ShoppingDetail/ShoppingDetail';
import './Cart.scss'


const Cart = (props) => {


    return (
        <div className="cart-container">
            <Header cart={true} />
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
