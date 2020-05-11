import { startSubmit, stopSubmit, reset } from 'redux-form'
import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchPost, fetchGet } from './fetch';
import { push } from 'connected-react-router'
import store from 'store'

//actions
import SignActionType from '../actions/Sign/ActionType';
import * as ActionCreators from '../actions/Sign/ActionCreator';
import * as MeActionCreators from '../actions/Me/ActionCreator';

function* postSignUp(action: ReturnType<typeof ActionCreators.postSignUp.request>) {
    yield put(startSubmit('SIGN_UP'));
	clearData()
    try {
        const [data,error]= yield call(fetchPost, 'signup', action.payload);
        if(data && !error){
            yield put(stopSubmit('SIGN_UP'));
            yield put(reset('SIGN_UP'));
            yield put(push('/sign_up/temporary'))
        }else{
            yield put(stopSubmit('SIGN_UP', Object.assign(error, {_error: error.non_field_errors})));
        }
    } catch (e) {
    	yield put(ActionCreators.postSignUp.failure(e));
    }
}

function* getSignUpActivate(action: ReturnType<typeof ActionCreators.getSignUpActivate.request>) {
	try {
		const [data,error] = yield call(fetchGet, `activate/${action.payload.id}`);
		yield put(push('/sign_in'))
	} catch (e) {
		yield put(ActionCreators.getSignUpActivate.failure(e));
	}
}

function* postSignIn(action: ReturnType<typeof ActionCreators.postSignIn.request>) {
	yield put(startSubmit('SIGN_IN'));
	clearData()
	try {
		const [data,error]= yield call(fetchPost, 'api-token-auth', action.payload)
		if(data && !error){
			store.set('token',data.token)
			yield put(stopSubmit('SIGN_IN'));
			yield put(reset('SIGN_IN'));
			yield put(push('/'))
		}else{
			yield put(stopSubmit('SIGN_IN', Object.assign(error, {_error: error.error || error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.postSignUp.failure(e));
	}
}

const signSaga = [
	takeLatest(SignActionType.POST_SIGN_UP_REQUEST, postSignUp),
	takeLatest(SignActionType.GET_SIGN_UP_ACTIVATE_REQUEST, getSignUpActivate),
	takeLatest(SignActionType.POST_SIGN_IN_REQUEST, postSignIn),
];

const clearData = () => {
	store.remove('token')
	store.remove('groupId')
}

export default signSaga;
