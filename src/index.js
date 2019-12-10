import '@babel/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './components/App';
import store from './reducers';

import 'bootstrap/scss/bootstrap.scss';
import './index.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

module.hot.accept();
