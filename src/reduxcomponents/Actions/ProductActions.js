import * as Action from '../ActionTypes/ProductActionTypes';

export function getProductData(productsData) {
    return {
        type: Action.GET_PRODUCTS_DATA,
        productsData
    }
}

export function getTotalPages(pages) {
    const totalPages = Math.ceil(pages / 10)
    return {
        type: Action.GET_TOTAL_PAGES,
        totalPages
    }
}


export function addToCart(id) {
    return {
        type: Action.ADD_TO_CART,
        id
    }
}

export function removeFromCart(id) {
    return {
        type: Action.REMOVE_FROM_CART,
        id
    }
}

export function cartItems(cartItems) {
    return {
        type: Action.CART_ITEMS,
        cartItems
    }
}