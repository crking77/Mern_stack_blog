import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers/index";
import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
