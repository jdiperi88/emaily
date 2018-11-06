import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/styles.css";
import "./styles/materialize.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import middleware from "./middleware/index";
import reduxThunk from "redux-thunk";

const store = createStore(reducers, {}, middleware);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
