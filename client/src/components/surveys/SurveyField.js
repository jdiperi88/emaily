// SurveyField contains logic to render a signle label and text input
import React from "react";

export default ({ input, label, meta: { touched, error } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
			<div className="red-text" style={{ marginBottom: "10px" }}>
				{touched && error}
			</div>
		</div>
	);
};
