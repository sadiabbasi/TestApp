import { createStore, applyMiddleware } from 'redux';
// import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';

// const createBrowserHistory = require('history').createBrowserHistory;


// export const history = createBrowserHistory();

// const routeMiddleware = routerMiddleware();

// const middlewares = [thunk, routeMiddleware];

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    // preloadedState,
    applyMiddleware(thunk)
  );

  return store;
}
