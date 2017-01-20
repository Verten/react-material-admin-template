/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { syncHistory } from 'react-router-redux'
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

// Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();

const reduxRouterMiddleware = syncHistory(browserHistory)
const store = configureStore();
reduxRouterMiddleware.listenForReplays(store)

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} onUpdate={() => {
      window.scrollTo(0, 0)
    }}/>
  </Provider>,
  document.getElementById('app')
);
