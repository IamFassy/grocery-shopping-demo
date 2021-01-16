import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import Item from '../Item/Item';
import './ShoppingDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

const ShoppingDetail = (props) => {

    let history = useHistory();

    const itemDetails = (cell, row) => {
        return (
            <Item item={row} />
        )
    }

    const itemPrice = (row, cell) => {
        return (
            <p>{'\u20B9'} {row}</p>
        )
    }

    const amount = (cell, row) => {
        console.log(row, "cell");
        return (
            <p>{'\u20B9'} {row.price * row.cartQuantity}</p>
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
            style: {
                fontSize: '14px',
                wordWrap: 'break-word',
                color: "#3D3D3D",
                fontWeight: 500
            },
            headerStyle: () => {
                return { fontSize: "16px", color: "#BBBBBB", width: "15%", borderTopWidth: 0, backgroundColor: "#F4F4F4", fontWeight: "600" }
            }
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
