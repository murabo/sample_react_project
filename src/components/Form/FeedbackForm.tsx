import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import TextField from "../Field/TextField";
import { Values, Errors } from "../../model/FormModel";
import Button from "@material-ui/core/Button";
import style from "./form.module.scss";
import store from 'store'

const validate = (values: Values) => {
	const errors: Errors = {};
	const requiredFields = [
		'email',
	]
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '必須です'
		}
	})
	return errors;
};


const FeedbackForm: React.FC<InjectedFormProps> = ({ handleSubmit, submitting, pristine, error }) => {

	return (
		<div className={style.root}>
			<form onSubmit={handleSubmit}>
				{error && <p className={style.error}>{error}</p>}
				<div>
					<ul className={style.panelItem}>
						{!store.get('token') && <li><Field name="email" type="text" component={TextField} label="メールアドレス"/></li>}
						<li><Field name="feedback" type="textarea" component={TextField} label="ご意見・ご要望"/></li>
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
	form: "FEEDBACK",
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
})(FeedbackForm);
