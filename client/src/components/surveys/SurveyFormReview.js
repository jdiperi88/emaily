import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import Fields from "redux-form/lib/Fields";
import * as actions from "../../actions/index";
import { withRouter } from "react-router-dom";
const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = formFields.map(({ name, label, submitSurvey }) => {
		return (
			<div>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});
	return (
		<div>
			<h5>Please confirm your entries!</h5>
			{reviewFields}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="green btn-flat white-text right"
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.surveyForm.values
	};
}

export default connect(
	mapStateToProps,
	actions
)(withRouter(SurveyReview));
