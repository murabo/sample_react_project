import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm, InjectedFormProps, change, formValueSelector } from "redux-form";

// component
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

//style
import style from "./form.module.scss";

// state
import { RootState } from "../../reducers";
import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";
import { FieldProps } from "../../model/FormModel";

const stateSelector = (state: RootState) => state;


const ReplyForm: React.FC<InjectedFormProps> = props => {

	const classes = useStyles();
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(true);
	const { id } = props;
	const state = useSelector(stateSelector);
	const selector = formValueSelector("REPLY");
	const name = `text${id}`;

	const handleCancel = () => {
		dispatch(change("REPLY", name, ""));
		setDisabled(true);
	};

	const handleChange = (e) => {
		setDisabled(!e.target.value ? true : false);
	};

	const handleSubmit = () => {
		let value = selector(state, name);
		dispatch(PressReleaseActionCreators.postPressReleaseReply.request({
			id: id,
			text: value,
		}));
	};

	return (
		<>
			<div className={style.reply}>
				<Field name={name} type="textarea" component={ReplyField} onChange={(e) => handleChange(e)}/>
				<Field name={"id"} type="hidden" component={TextField}/>
				<div className={style.actions}>
					<Button variant="outlined" size="small" color="primary" className={classes.margin}
							onClick={() => handleCancel()}>
						クリア
					</Button>
					<Button disabled={disabled} variant="contained" size="small" color="primary" className={classes.margin}
							onClick={() => handleSubmit()}>
						送信
					</Button>
				</div>
			</div>
		</>
	);
};

export default reduxForm({
	form: "REPLY",
})(ReplyForm);

const useStyles = makeStyles({
	textareaField: {
		fontSize: "1.2rem",
		lineHeight: "1.5",
		minHeight: "3rem",
	},
	margin: {
		marginRight: "1rem",
	},
});


const ReplyField: React.FC<FieldProps> = ({ input, label, type, meta: { touched, error, warning } }) => {
	const classes = useStyles();

	return (
		<div>
			<TextField {...input}
					   multiline
					   placeholder={label}
					   type={type}
					   InputProps={{
						   classes: {
							   input: classes.textareaField,
						   },
					   }}
			/>
			{touched && (
				<div style={{ color: "red", fontSize: "80%" }}>
					<p>{(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}</p>
				</div>
			)}
		</div>
	);
};

