import { takeLatest, put, call, select } from 'redux-saga/effects';
import { stopSubmit, reset } from 'redux-form'
import { diff } from "deep-object-diff";
import store from 'store'
import { push } from "connected-react-router";

import { selectCompany, selectGroup } from "./selector";
import { fetchGet, fetchPatch, fetchPatchForm, fetchPost } from "./fetch";

// actions
import CompanyActionType from '../actions/Company/ActionType';
import * as ActionCreators from '../actions/Company/ActionCreator';

function* getCompany(action: ReturnType<typeof ActionCreators.getCompany.request>) {
	try {
		const group = yield select(selectGroup);
		const [data,error] = yield call(fetchGet,`groups/${group.selectedId}/company/`);
		yield put(ActionCreators.getCompany.success(data.results))
	} catch (e) {
		yield put(ActionCreators.getCompany.failure(e));
	}
}

function* postCompany(action: ReturnType<typeof ActionCreators.postCompany.request>) {
	try {
		const [data,error]= yield call(fetchPost, `companies`, action.payload);
		if(data && !error){
			yield put(stopSubmit('COMPANY_INIT'));
			yield put(reset('COMPANY_INIT'));
			yield put(ActionCreators.postCompany.success(data));
		}else{
			yield put(stopSubmit('COMPANY_INIT', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.postCompany.failure(e));
	}
}

function* patchCompany(action: ReturnType<typeof ActionCreators.patchCompany.request>) {

	try {
		const company = yield select(selectCompany);
		const group = yield select(selectGroup);
		const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/company/${company.uuid}`, diff(company, action.payload));
		if(data && !error){
			yield put(stopSubmit('COMPANY_EDIT'));
			yield put(reset('COMPANY_EDIT'));
			yield put(push('/setting/company/'))
            yield put(ActionCreators.patchCompany.success(data));
		}else{
			yield put(stopSubmit('COMPANY_EDIT', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.patchCompany.failure(e));
	}
}

function* patchLogo(action: ReturnType<typeof ActionCreators.patchLogo.request>) {
	try {
		const company = yield select(selectCompany);
		const group = yield select(selectGroup);
		const [data,error] = yield call(fetchPatchForm, `groups/${group.selectedId}/company/${company.uuid}`, action.payload);
		yield put(ActionCreators.patchLogo.success(data))
	} catch (e) {
		yield put(ActionCreators.patchLogo.failure(e));
	}
}

const companySaga = [
	takeLatest(CompanyActionType.GET_COMPANY_REQUEST, getCompany),
	takeLatest(CompanyActionType.POST_COMPANY_REQUEST, postCompany),
	takeLatest(CompanyActionType.PATCH_COMPANY_REQUEST, patchCompany),
	takeLatest(CompanyActionType.PATCH_LOGO_REQUEST, patchLogo),
];

export default companySaga;

