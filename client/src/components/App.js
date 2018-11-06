import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { connect } from "react-redux";

import * as actions from "../actions/index";

const Dashboard = () => {
	return <h2>Dashboard</h2>;
};
const SurveyNew = () => {
	return <h2>SurveyNew</h2>;
};

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<Router>
					<div className="container">
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route exact path="/surveys/new" component={SurveyNew} />
					</div>
				</Router>
			</div>
		);
	}
}

export default connect(
	null,
	actions
)(App);
