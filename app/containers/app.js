import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//import { apiMiddleware } from 'redux-api-middleware';

import * as reducers from '../reducers';
import CounterApp from './counterApp';

//const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    );
  }
}
