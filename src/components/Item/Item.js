import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Item.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NetworkManager from '../../apimanager/NetworkManager';
import { editCart, getCart, httpMethods } from '../../apimanager/Endpoints';
import { useDispatch } from 'react-redux';
import { cartItems } from '../../reduxcomponents/Actions/ProductActions';

const Item = (props) => {

    let dispatch = useDispatch();

    const removeItem = () => {
        let body = {
            "product_id": props.item.id,
            "auth_key": "6c55fa36a2138b23a52e74619bfdae147fa0c3e1",
            "quantity": 0
        }

        NetworkManager.request(editCart, httpMethods.post, body)
            .then((res) => {
                console.log(res, "clear");
                if (res.status === 200) {
                    NetworkManager.request(getCart + "auth_key=6c55fa36a2138b23a52e74619bfdae147fa0c3e1", httpMethods.get)
                        .then((res) => {
                            if (res.status === 200) {
                                dispatch(cartItems(res.data))
                            }
                        })
                        .catch((err) => {

                        })
                }
            })
            .catch((err) => {
                console.log(err, "err");
            })
    }

    return (
        <div className="item-container">
            <Row className="item-container__row">
                <Col lg="3" md="3" className="item-container__row-left">
                    <img src={props.item.imageUrl} />
                </Col>
                <Col lg="8" md="8" className="item-container__row-right">
                    <p className="product-item-container__title">{props.item.name}</p>
                    <Row style={{ alignItems: "center", marginLeft: 0, marginRight: 0 }}>

                        <button type="button" className="item-container__row-right-button" >
                            <FontAwesomeIcon icon="heart" style={{ marginRight: 5 }} size={"xs"} color="#7C7C7C" />
                            Move To Wishlist
                            </button>

                        <button onClick={() => removeItem()} type="button" className="item-container__row-right-button">
                            <FontAwesomeIcon icon="times" style={{ marginRight: 5, marginLeft: 20 }} size={"xs"} color="#7C7C7C" />
                            Remove</button>
                    </Row>

                </Col>


            </Row>
        </div>
    )
}

export default Item
