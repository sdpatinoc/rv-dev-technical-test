import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.scss';
import App from './App';
import reducers from './reducers';
import rootSaga from './sagas';
import setupSocket from './sockets'
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

const socket = setupSocket(store.dispatch);
sagaMiddleware.run(rootSaga, {socket});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals();
