import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../RootReducer/RootReducer';

const root = rootReducer()

const store = createStore(root, applyMiddleware(thunk))

export { store };