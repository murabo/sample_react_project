import { takeLatest, put, call, select } from 'redux-saga/effects';
import { stopSubmit, reset } from 'redux-form'
import { fetchPost } from "./fetch";

// actions
import ActionType from '../actions/Feedback/ActionType';
import * as ActionCreators from '../actions/Feedback/ActionCreator';
import { selectGroup } from "./selector";

function* postFeedBack(action: ReturnType<typeof ActionCreators.postFeedback.request>) {
	try {
		const group = yield select(selectGroup);
		const [data,error]= yield call(fetchPost, `feedback`, action.payload);
		if(data && !error){
			yield put(stopSubmit('FEEDBACK'));
			yield put(reset('FEEDBACK'));
		}else{
			yield put(stopSubmit('FEEDBACK', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.postFeedback.failure(e));
	}
}

const feedbackSaga = [
	takeLatest(ActionType.POST_FEEDBACK_REQUEST, postFeedBack),
];

export default feedbackSaga;

