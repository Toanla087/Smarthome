import React from "react";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import App from "./App";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";
import "./index.css";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
