import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import TextField from "../Field/TextField";
import CheckBoxField from "../Field/CheckBoxField";
import Button from "@material-ui/core/Button";
import style from "./form.module.scss";
import { useSelector } from "react-redux";
import { formValueSelector } from "redux-form";

//state
import {RootState} from "../../reducers";
import { Typography } from "@material-ui/core";
import { Errors, Values } from "../../model/FormModel";
import PasswordText from "../Common/PasswordText";
const stateSelector = (state: RootState) => state;

const validate = (values: Values) => {
	const errors: Errors = {};
	const requiredFields = [
		'email',
		'password',
		'password2',
		'agree',
	]
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '必須です'
		}
	})

	if (values["password"]  !== values["password2"] ) {
		errors["password2"] = 'パスワードが一致しません'
	}

	return errors;
};


const SignUpForm: React.FC<InjectedFormProps> = ({ handleSubmit, submitting, pristine, error }) => {

	const state = useSelector(stateSelector);
	const selector = formValueSelector('SIGN_UP');
	let agree = selector(state, 'agree')
	const label = <Typography variant="caption">
		<Typography variant="caption" color={"primary"}>
			<a target="_blank" href={`/terms`}>利用規約</a></Typography>に同意する</Typography>

	return (
		<div className={style.root}>
			<form onSubmit={handleSubmit}>
				{error && <p className={style.error}>{error}</p>}
				<ul className={style.panelItem}>
					<li><Field name="email" type="text" component={TextField} label="メールアドレス"/></li>
					<li>
						<Field name="password" type="password" component={TextField} label="パスワード"/>
					</li>
					<li>
						<Field name="password2" type="password" component={TextField} label="確認用パスワード"/>
					</li>
					<li><PasswordText/></li>
					<li>
						<Field name="agree" component={CheckBoxField} label={label}/>
					</li>
				</ul>
				<Button variant="contained" size="large" type="submit" color="primary" disabled={pristine || submitting || !agree}>
					アカウント作成
				</Button>
			</form>
		</div>
	);
};

export default reduxForm({
	validate,
	form: "SIGN_UP",
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
})(SignUpForm);
