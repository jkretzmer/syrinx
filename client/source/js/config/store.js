import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'dev/logger';
import rootReducer from 'reducers';
import socketMiddleware from 'middleware/socketMiddleware.js';

const isProduction = process.env.NODE_ENV === 'production';

export default () => {
  let store = null;
  let middleware = null;

  if (isProduction) {
    middleware = applyMiddleware(thunk, socketMiddleware);
  } else {
    middleware = applyMiddleware(thunk, socketMiddleware, logger);

    if (!process.env.SERVER_RENDER && window.__REDUX_DEVTOOLS_EXTENSION__) {
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
  }

  store = createStore(
    rootReducer,
    middleware
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
