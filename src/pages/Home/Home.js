import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getProducts, httpMethods } from '../../apimanager/Endpoints';
import NetworkManager from '../../apimanager/NetworkManager';
import Header from '../../components/Header/Header';
import { getProductData, getTotalPages } from '../../reduxcomponents/Actions/ProductActions';
import Loader from 'react-loader-spinner';
import './Home.scss';
import ProductItem from '../../components/ProductItem/ProductItem';
import { Col, Pagination, Row } from 'react-bootstrap';

const Home = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    let dispatch = useDispatch()

    useEffect(() => {
        getData(1)
    }, [])


    const getData = (page) => {
        setLoading(true)
        NetworkManager.request(getProducts + "auth_key=6c55fa36a2138b23a52e74619bfdae147fa0c3e1&" + "pageNo=" + page + "&itemsPerPage=10", httpMethods.get)
            .then((res) => {
                setLoading(false)
                if (res.status === 200) {
                    dispatch(getProductData(res.data.products))
                    dispatch(getTotalPages(res.data.total))
                    setError(false)
                }
                else {
                    setError(true)
                }

            })
            .catch((err) => {
                setLoading(false)
                setError(true)
                console.log(err, "err");
            })
    }

    const changePage = (item) => {
        setCurrentPage(item)
        getData(item)
    }


    const getPagination = () => {
        let arr = []
        for (let i = 1; i <= props.totalPages; i++) {
            arr.push(i)
        }

        return (
            arr.map((item, index) => {
                return (
                    <Pagination.Item onClick={() => changePage(item)} active={currentPage === item} key={index}>
                        {item}
                    </Pagination.Item>
                )
            })
        )
    }

    const goBackFull = () => {
        setCurrentPage(1)
        getData(1)

    }

    const goBack = () => {
        let page = currentPage - 1
        setCurrentPage(page)
        getData(page)
    }

    const goNextFull = () => {
        setCurrentPage(props.totalPages)
        getData(props.totalPages)
    }

    const goNext = () => {
        let page = currentPage + 1
        setCurrentPage(page)
        getData(page)
    }





    return (
        <div className="home-container">
            <Header />
            <div className="home-container__body">
                {loading == true &&
                    <div className="home-container__body-loader">
                        <Loader
                            type="Bars"
                            color="#B81125"
                            width={100}
                            height={50}
                        />
                    </div>
                }
                {loading === false && error &&
                    <div>
                        <p>There was an error while fetching the data!!!</p>
                    </div>
                }
                {loading === false && !error && props.productsData.length > 0 &&
                    <div className="home-container__body-product">
                        <Row className="home-container__body-product-row">

                            {props.productsData.map((item, index) => {
                                return (<Col lg={3} sm={12} md={3} xl={3} xs={12}>
                                    <ProductItem key={index} item={item} />
                                </Col>
                                )
                            })}

                        </Row>
                        <div className="home-container__body-product-pagination">
                            <Pagination  >
                                <Pagination.First style={{ color: "#B81125" }} disabled={currentPage === 1} onClick={() => goBackFull()} />
                                <Pagination.Prev disabled={currentPage === 1} onClick={() => goBack()} />
                                {getPagination()}
                                <Pagination.Next disabled={currentPage === props.totalPages} onClick={() => goNext()} />
                                <Pagination.Last disabled={currentPage === props.totalPages} onClick={() => goNextFull()} />
                            </Pagination>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productsData: state.product.productsData,
        totalPages: state.product.totalPages,
        cartItems: state.product.cartItems
    }
}

export default connect(mapStateToProps)(Home)
