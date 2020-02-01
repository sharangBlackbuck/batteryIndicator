import React from 'react';
import ReactDOM from 'react-dom';

//import browser router ,provider and redux stores
import { BrowserRouter } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { withRouter } from 'react-router';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

// import all reducers and sagas
import batteryReducer from './store/reducers/batteryReducer';
import rootSaga from './store/sagas/index';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//basic imports
import './index.css';
import App from './App';

const rootReducer = combineReducers({
  batteryReducer,
});

const initialState = {};
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];
const enhancers = [
    applyMiddleware(...middlewares),
  ];
  
  const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(...enhancers));

sagaMiddleware.run(rootSaga);

const MOUNT_NODE = document.getElementById('root');
const RouterApp = withRouter(App);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <RouterApp />
      </BrowserRouter>
    </Provider>,
    MOUNT_NODE
  );


