import React from 'react';
import './ProductItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../reduxcomponents/Actions/ProductActions';
import { Col, Row } from 'react-bootstrap';
import NetworkManager from '../../apimanager/NetworkManager';
import { editCart, httpMethods } from '../../apimanager/Endpoints';


const ProductItem = ({ item }) => {

    let dispatch = useDispatch()



    const handleAdd = () => {
        // debounceOnChange
        let body = {
            "product_id": item.id,
            "auth_key": "6c55fa36a2138b23a52e74619bfdae147fa0c3e1",
            "quantity": item.cartQuantity + 1
        }
        changeCart(body, "add")
    }

    const changeCart = (body, type) => {
        NetworkManager.request(editCart, httpMethods.post, body)
            .then((res) => {
                console.log(res, "res");
                if (res.status === 200) {
                    if (type === "remove") {
                        dispatch(removeFromCart(item.id))
                    }
                    else {
                        dispatch(addToCart(item.id))
                    }

                }
            })
            .catch((err) => {
                console.log(err, "err");
            })
    }

    const handleRemove = () => {
        // debounceOnChange
        let body = {
            "product_id": item.id,
            "auth_key": "6c55fa36a2138b23a52e74619bfdae147fa0c3e1",
            "quantity": item.cartQuantity - 1
        }
        changeCart(body, "remove")

    }



    return (
        <div className="product-item-container">
            <img src={item.imageUrl} />
            <p className="product-item-container__title">{item.name}</p>
            <p className="product-item-container__price">{'\u20B9'} {item.price}</p>
            {item.cartQuantity === 0 && <button onClick={() => handleAdd()} className="product-item-container__add-button" variant="none">
                <div className="product-item-container__add-button-icon" >
                    <FontAwesomeIcon icon="plus" size={"xs"} color="#FFF" />
                </div>
               ADD
            </button>}
            { item.cartQuantity > 0 &&
                <Col lg="5" className="product-item-container__quantity-button">
                    <Row style={{ justifyContent: "space-between", margin: 0 }}>
                        <button type="button" onClick={() => handleRemove()} style={{ outline: "none" }} className="product-item-container__quantity-button-count"  >
                            <FontAwesomeIcon icon="minus" size={"xs"} color="#7C7C7C" />
                        </button>
                        <span>
                            {item.cartQuantity}
                        </span>
                        <button type="button" onClick={() => handleAdd()} style={{ outline: "none" }} className="product-item-container__quantity-button-count"  >
                            <FontAwesomeIcon icon="plus" size={"xs"} color="#7C7C7C" />
                        </button>
                    </Row>

                </Col>}


        </div>
    )

}

export default ProductItem
