import React from 'react';
import ReactDOM from 'react-dom';

import {
  combineReducers,
  createStore,
} from 'redux';

import {
  Provider,
} from 'react-redux';

import {
  loadValues,
} from './modules/storage';

import {
  reducer as configReducer,
} from './redux/config';

import {
  reducer as buttonReducer,
} from './redux/button';

import App from './components/App';

(async function(){

  const reducers = combineReducers({
    button: buttonReducer,
    config: configReducer,
  });

  const initialState = {
    config: await loadValues(),
  };

  let devToolsEnhancer;

  //if (process.env.NODE_ENV !== 'production') {
    devToolsEnhancer = require('remote-redux-devtools').default;
  //}

  const store = createStore(
    reducers,
    initialState,
    devToolsEnhancer({
      realtime: true,
      actionSanitizer(action) {
        // serialize Symbol
        return (typeof action.type === 'symbol') ? Object.assign({}, action, {
          type: String(action.type).slice(7, -1),
        }) : action;
      },
    })
  );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );

}());
