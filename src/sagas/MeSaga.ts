import { takeLatest, put, call, select } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { diff } from "deep-object-diff";
import store from 'store'
import { push } from "connected-react-router";

import { selectMe } from "./selector";
import { fetchGet, fetchPatch, fetchPatchForm, fetchPost } from "./fetch";

// actions
import MeActionType from '../actions/Me/ActionType';
import * as ActionCreators from '../actions/Me/ActionCreator';

function* getMe(action: ReturnType<typeof ActionCreators.getMe.request>) {
	try {
		const [data,error] = yield call(fetchGet, `users/me/`);
		yield put(ActionCreators.getMe.success(data))
	} catch (e) {
		yield put(ActionCreators.getMe.failure(e));
	}
}

function* patchMe(action: ReturnType<typeof ActionCreators.patchMe.request>) {
	yield put(startSubmit('ME_EDIT'));
	try {
		const me = yield select(selectMe);
		const send:any = diff(me, action.payload)
		let editFlg = false

		if (me.first_name) {
			editFlg = true
			delete send.img
		}
		const [data,error]= yield call(fetchPatch, `users/me`, diff(me, send));
		if(data && !error){
			yield put(stopSubmit('ME_EDIT'));
			yield put(reset('ME_EDIT'));
			if (editFlg) {
				yield put(push('/user/me/'))
			}
            yield put(ActionCreators.patchMe.success(data));
		}else{
			yield put(stopSubmit('ME_EDIT', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.patchMe.failure(e));
	}
}


function* patchProfileImage(action: ReturnType<typeof ActionCreators.patchProfileImage.request>) {
    try {
        const [data,error] = yield call(fetchPatchForm, `users/me`, action.payload);
        yield put(ActionCreators.patchProfileImage.success(data))
    } catch (e) {
        yield put(ActionCreators.patchProfileImage.failure(e));
    }
}

function* patchPassword(action: ReturnType<typeof ActionCreators.patchPassword.request>) {
	try {
		const me = yield select(selectMe);
		const {password, password2} = action.payload
		if (password !== password2) {
			yield put(stopSubmit('PASSWORD_EDIT', {_error: 'パスワードが一致しません'}));
			return
		}
		const [data,error] = yield call(fetchPost, `password/reset/${me.uuid}`, {password: action.payload.password});
		if(data && !error){
			yield put(push('/user/me/'))
		}else{
			yield put(stopSubmit('PASSWORD_EDIT', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.patchPassword.failure(e));
	}
}


const meSaga = [
	takeLatest(MeActionType.GET_ME_REQUEST, getMe),
	takeLatest(MeActionType.PATCH_ME_REQUEST, patchMe),
    takeLatest(MeActionType.PATCH_PROFILE_IMAGE_REQUEST, patchProfileImage),
	takeLatest(MeActionType.PATCH_PASSWORD_REQUEST, patchPassword),
];

export default meSaga;

