import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect, useDispatch } from 'react-redux';
import Item from '../Item/Item';
import './ShoppingDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import NetworkManager from '../../apimanager/NetworkManager';
import { editCart, getCart, httpMethods } from '../../apimanager/Endpoints';
import { cartItems } from '../../reduxcomponents/Actions/ProductActions';

const ShoppingDetail = (props) => {

    let dispatch = useDispatch()

    let history = useHistory();

    const itemDetails = (cell, row) => {
        return (
            <Item item={row} />
        )
    }

    const itemPrice = (cell, row) => {
        return (
            <p>{'\u20B9'} {cell}</p>
        )
    }

    const changeQuantity = (e, row) => {

        let body = {
            "product_id": row.id,
            "auth_key": "6c55fa36a2138b23a52e74619bfdae147fa0c3e1",
            "quantity": e.target.value
        }

        NetworkManager.request(editCart, httpMethods.post, body)
            .then((res) => {
                // console.log(res, "edit cart");
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

    const amount = (cell, row) => {
        console.log(row, "cell");
        return (
            <p>{'\u20B9'} {row.price * row.cartQuantity}</p>
        )
    }

    const quantity = (cell, row) => {
        console.log(cell, "here");
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        return (
            <select value={cell} onChange={(e) => changeQuantity(e, row)}>
                {  arr.map((item, index) => {
                    return <option key={index}>{item}</option>
                })}

            </select>
        )
    }


    const columns = [
        {
            dataField: "name",
            text: 'Item Details',
            formatter: itemDetails,
            style: {
                fontSize: '14px',
                wordWrap: 'break-word',
                color: "#3D3D3D",
                fontWeight: 500
            },
            headerStyle: () => {
                return { fontSize: "16px", color: "#BBBBBB", width: "55%", borderTopWidth: 0, backgroundColor: "#F4F4F4", fontWeight: "600" }
            },

        },
        {
            dataField: "cartQuantity",
            text: 'Quantity',
            formatter: quantity,
            style: {
                fontSize: '14px',
                wordWrap: 'break-word',
                color: "#3D3D3D",
                fontWeight: 500
            },
            headerStyle: () => {
                return { fontSize: "16px", color: "#BBBBBB", width: "15%", borderTopWidth: 0, backgroundColor: "#F4F4F4", fontWeight: "600" }
            },

        },
        {
            dataField: "price",
            text: 'Rate',
            style: {
                fontSize: '14px',
                wordWrap: 'break-word',
                color: "#3D3D3D",
                fontWeight: 500
            },
            formatter: itemPrice,
            headerStyle: () => {
                return { fontSize: "16px", color: "#BBBBBB", width: "15%", borderTopWidth: 0, backgroundColor: "#F4F4F4", fontWeight: "600" }
            }
        },
        {
            dataField: "item",
            text: 'Amount',
            style: {
                fontSize: '14px',
                wordWrap: 'break-word',
                color: "#3D3D3D",
                fontWeight: 500
            },
            formatter: amount,
            headerStyle: () => {
                return { fontSize: "16px", color: "#BBBBBB", width: "15%", borderTopWidth: 0, backgroundColor: "#F4F4F4", fontWeight: "600" }
            }
        },
    ];


    const toHome = () => {
        history.push("/")
    }

    return (
        <div className="shopping-detail-container">
            <BootstrapTable
                bootstrap4
                keyField='id'
                hover
                rowStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                data={props.cartItems}
                columns={columns}
                bordered={false}

            />
            <div className="shopping-detail-container__button">
                <button type="button" onClick={() => toHome()} className="shopping-detail-container__button-back">
                    <FontAwesomeIcon icon="chevron-left" size={"xs"} style={{ marginRight: 10 }} color="#B81125" />
                    Continue Shopping
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.product.cartItems
    }
}

export default connect(mapStateToProps)(ShoppingDetail)
