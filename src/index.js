import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from "./reducers";
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'


import './index.css';
import App from './components/App';

const store = createStore(rootReducers, {}, applyMiddleware(reduxThunk));

window.axios = axios;

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
