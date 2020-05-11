import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import TextField from "../Field/TextField";
import Button from "@material-ui/core/Button";
import style from "./form.module.scss";
import { Errors, Values } from "../../model/FormModel";

const validate = (values: Values) => {
	const errors: Errors = {};
	const requiredFields = [
		'username'
	]
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '必須です'
		}
	})
	return errors;
};


const ResetPasswordForm: React.FC<InjectedFormProps> = ({ handleSubmit, submitting, pristine, error }) => {

	return (
		<div className={style.root}>
			<form onSubmit={handleSubmit}>
				{error && <p className={style.error}>{error}</p>}
				<div>
					<ul className={style.panelItem}>
						<li><Field name="username" type="email" component={TextField} label="メールアドレス"/></li>
					</ul>
					<div className="form-group">
						<Button variant="contained" size="large" type="submit" color="primary" disabled={pristine || submitting}>
							送信
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default reduxForm({
	validate,
	form: "RESET_PASSWORD",
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
})(ResetPasswordForm);
