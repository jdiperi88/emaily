import { combineReducers } from "redux";
import authReducer from "./authReducer";
// reducer is the specific object being pulled of the redux-form module
import { reducer as reduxForm } from "redux-form";
export default combineReducers({
	auth: authReducer,
	// the property key "form" must be used becuase thats what redux-form assumes is being used throughout the app
	form: reduxForm
});
