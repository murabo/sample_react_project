import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm, InjectedFormProps, change, formValueSelector } from "redux-form";

// component
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Avatar from "../Common/Avatar";

//style
import style from "./form.module.scss";

import * as PressReleaseActionCreators from "../../actions/PressRelease/ActionCreator";

// state
import {RootState} from "../../reducers";
import { FieldProps } from "../../model/FormModel";
const stateSelector = (state: RootState) => state;
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const meSelector = (state: RootState) => state.me;

const CommentForm: React.FC<InjectedFormProps> = props => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true)
	const [top, setTop] = useState(80)
    const { submitting, error, index } = props;
    const state = useSelector(stateSelector);
    const selector = formValueSelector('COMMENT');
    const pressRelease = useSelector(pressReleaseSelector);
    const me = useSelector(meSelector);

    const name = `text`;
    const handleCancel = () => {
        dispatch(change('COMMENT', name, ''))
        setDisabled(true)
        dispatch(PressReleaseActionCreators.setPressReleaseCommentForm.request( {
            position: '',
            quote: '',
            isDisplayForm: false
        }))
    }

    const handleChange = (e) => {
        setDisabled(!e.target.value ? true: false)
    }

    const handleSubmit = () => {
        let value = selector(state, 'text')
        dispatch(PressReleaseActionCreators.postPressReleaseComment.request( {text : `<p class="quote">${pressRelease.comment.form.quote}</p>${value}`}))
    }

    // useEffect(() => {
    //     if (pressRelease.comment.form.quote !== "") {
    //         dispatch(change('COMMENT', name, `<p class="quote">${pressRelease.comment.form.quote}</p>`))
    //     }
    // }, [pressRelease.comment.form.quote]);
	//

	useEffect(() => {
		setTop(pressRelease.comment.form.position)
	}, [pressRelease.comment.form.position]);

    return (
		<div className={style.root} style={{'top': `${top}px`}}>
			<div className={style.comment}>
				<div className={style.head}>
					<Avatar src={me.img} name={me.last_name} size="small" active={false} color={me.color_cd}/>
					<div>
						{pressRelease.comment.form.quote && <p className={style.quote}>{pressRelease.comment.form.quote}</p>}
						<Field name="text" type="textarea" component={CommentField} onChange={(e)=>handleChange(e)}/>
					</div>
				</div>

				<div className={style.actions}>
					<Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleCancel()}>
						クリア
					</Button>
					<Button variant="contained" size="small" color="primary" className={classes.margin}
							disabled={disabled || submitting} onClick={()=>handleSubmit()}>
						コメント
					</Button>
				</div>
			</div>
		</div>
    );
};

export default reduxForm({
    form: 'COMMENT',
})(CommentForm);

const useStyles = makeStyles(() => ({
	textareaField: {
		padding: 0
	},
	input: {
		paddingLeft: '15px',
        fontSize: 14,
        lineHeight: 1.5,
        minHeight: 30,
    },
    margin: {
        marginRight: '1rem'
    },
}));


const CommentField: React.FC<FieldProps> = ({ input, label, type, meta: { touched, error, warning } }) => {
	const classes = useStyles();

	return (
		<div>
			<TextField {...input}
					   className={classes.textareaField}
					   multiline
					   placeholder={label}
					   type={type}
					   InputProps={{
						   classes: {
							   input: classes.input,
						   },
					   }}
			/>
		</div>
	);
};

