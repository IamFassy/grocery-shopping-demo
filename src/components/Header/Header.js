import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, httpMethods } from '../../apimanager/Endpoints';
import NetworkManager from '../../apimanager/NetworkManager';
import { cartItems } from '../../reduxcomponents/Actions/ProductActions';
import './Header.scss';

const Header = (props) => {

    let dispatch = useDispatch()

    useEffect(() => {
        getCartItems()
    }, [])


    const getCartItems = () => {
        NetworkManager.request(getCart + "auth_key=6c55fa36a2138b23a52e74619bfdae147fa0c3e1", httpMethods.get)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(cartItems(res.data))
                }
                console.log(res, "res");
            })
            .catch((err) => {
                console.log(err, "err");
            })
    }

    console.log(props.cartItems);

    return (
        <header className="header-container">
            <Row className="header-container__row">
                <Link to="/">Home</Link>
                <span>|</span>
                <Link to="/cart">Cart {props.cartItems.length > 0 && "(" + props.cartItems.length + ")"}</Link>
            </Row>
        </header>

    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.product.cartItems
    }
}

export default connect(mapStateToProps)(Header)
