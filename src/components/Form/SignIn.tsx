import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import TextField from "../Field/TextField";
import { required } from "../../util/validation";
import { Values, Errors } from "../../model/FormModel";
import Button from "@material-ui/core/Button";
import style from "./form.module.scss";

const validate = (values: Values) => {
	const errors: Errors = {};
	const requiredFields = [
		'username',
		'password'
	]
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '必須です'
		}
	})
	return errors;
};


const SignInForm: React.FC<InjectedFormProps> = ({ handleSubmit, submitting, pristine, error }) => {

	return (
		<div className={style.root}>
			<form onSubmit={handleSubmit}>
				{error && <p className={style.error}>{error}</p>}
				<div>
					<ul className={style.panelItem}>
						<li><Field name="username" type="text" component={TextField} label="メールアドレス"/></li>
						<li><Field name="password" type="password" component={TextField} label="パスワード"/></li>
					</ul>
					<div className="form-group">
						<Button variant="contained" size="large" type="submit" color="primary" disabled={pristine || submitting}>
							ログイン
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default reduxForm({
	validate,
	form: "SIGN_IN",
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
})(SignInForm);
