import * as Action from '../ActionTypes/ProductActionTypes';

const INITIAL_STATE = {
    productsData: [],
    totalPages: 0,
    cartItems: []
}

export default function productReducer(state = INITIAL_STATE, action) {
    const { productsData, totalPages, id, cartItems } = action
    switch (action.type) {

        case Action.GET_PRODUCTS_DATA:
            return {
                ...state,
                productsData
            }

        case Action.GET_TOTAL_PAGES:
            return {
                ...state,
                totalPages
            }

        case Action.ADD_TO_CART: {

            let items = [...state.productsData]
            let addedItem = items.find(item => item.id === id)
            //Checking if item exists
            let item_exists = state.cartItems.find(item => item.id === id)

            if (item_exists) {

                addedItem.cartQuantity += 1

                return {
                    ...state,
                    cartItems: [...state.cartItems]
                }
            }
            else {

                addedItem.cartQuantity = addedItem.cartQuantity + 1;
                return {
                    ...state,
                    cartItems: [...state.cartItems, addedItem],

                };
            }
        }
        
        case Action.REMOVE_FROM_CART: {
            let addedItem = state.productsData.find(item => item.id === id)
            //if the quantity == 0 then it should be removed
            if (addedItem.cartQuantity === 1) {
                addedItem.cartQuantity = 0
                let new_items = state.cartItems.filter(item => item.id !== id)

                return {
                    ...state,
                    cartItems: new_items,
                }
            }
            else {
                addedItem.cartQuantity -= 1

                return {
                    ...state,
                    cartItems: [...state.cartItems]
                }
            }
        }

        case Action.CART_ITEMS: {
            return {
                ...state,
                cartItems
            }
        }

        default:
            return state
    }
}