import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import './Checkout.scss';

const Checkout = (props) => {

    const [total, setTotal] = useState()

    useEffect(() => {
        console.log(props.items, "props");
        let amount = 0;
        for (let i = 0; i < props.items.length; i++) {
            let itemAmount = props.items[i].cartQuantity * props.items[i].price
            amount = amount + itemAmount

        }
        setTotal(amount)
    }, [props.items])


    const renderRow = (title) => {
        return (
            <Row className="checkout-container__row">
                <p style={{ color: title === "Order Worth" ? "#BBBBBB" : "#878787" }} className="checkout-container__row-title">{title}</p>
                <p className="checkout-container__row-price">{'\u20B9'} {total}</p>
            </Row>
        )
    }


    return (
        <div className="checkout-container">
            <div style={{ paddingBottom: 10 }}>
                {renderRow("Order Worth")}
            </div>
            <div style={{ paddingTop: 10 }} className="checkout-container__divide">
                {renderRow("Amount Payable")}
            </div>

            <div className="checkout-container__button">

                <button type="button" className="checkout-container__button-continue" >
                    Checkout
                </button>
            </div>

        </div>
    )
}



export default Checkout
