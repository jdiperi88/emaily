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

import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, middleware);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

const survey = {
	title: "my title",
	subject: "my subject",
	recipients: "jdiperi88@gmail.com",
	body: "heres the body of the email"
};
