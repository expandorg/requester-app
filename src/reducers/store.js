// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createAnalyticsMiddlware } from '@gemsorg/app-utils/gtm';
import { settings } from '@gemsorg/utils';

import sagas from '../sagas';
import services from '../services';

import rootReducer from './rootReducer';

export const sagaMiddleware = createSagaMiddleware({ context: { services } });

const middleware = (middlewares => {
  if (process.env.NODE_ENV !== 'production' || settings.devTools) {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      return compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
  }
  return applyMiddleware(...middlewares);
})([sagaMiddleware, createAnalyticsMiddlware(services)]);

const store = createStore(rootReducer, window.initialState || {}, middleware);

sagaMiddleware.run(sagas);

export default store;
