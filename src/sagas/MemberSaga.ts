import { takeLatest, put, call, select } from 'redux-saga/effects';
import { selectGroup, selectMember } from "./selector";
import { fetchGet, fetchDelete, fetchPost, fetchPatch } from "./fetch";

// actions
import MemberActionType from '../actions/Member/ActionType';
import * as ActionCreators from '../actions/Member/ActionCreator';
import { MemberListRequestModel } from "../model/MemberModel";

function* getMemberList(action: ReturnType<typeof ActionCreators.getMemberList.request>) {
	try {
		const group = yield select(selectGroup);
		const request:MemberListRequestModel = action.payload
		let offset = request.offset
		offset = offset <= 1 ? 0 : (offset * 10) - 10
		const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/members/?offset=${offset}&limit=${request.limit || 10}`);
		yield put(ActionCreators.getMemberList.success(Object.assign({}, {offset: request.offset}, data)))
	} catch (e) {
		yield put(ActionCreators.getMemberList.failure(e));
	}
}

function* getMemberSearch(action: ReturnType<typeof ActionCreators.getMemberSearch.request>) {
	try {
		const group = yield select(selectGroup);
		const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/search_member/?q=${action.payload}`);
		yield put(ActionCreators.getMemberSearch.success(data.results))
	} catch (e) {
		yield put(ActionCreators.getMemberSearch.failure(e));
	}
}

function* postMember(action: ReturnType<typeof ActionCreators.postMember.request>) {
	try {
		const group = yield select(selectGroup);
		const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/invite_group`, action.payload);
		const member = yield select(selectMember);
		yield put(ActionCreators.getMemberList.request({offset: member.list.offset}))
	} catch (e) {
		yield put(ActionCreators.postMember.failure(e));
	}
}

function* deleteMember(action: ReturnType<typeof ActionCreators.deleteMember.request>) {
	try {
		const group = yield select(selectGroup);
		const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/members/${action.payload}`);
		const member = yield select(selectMember);
		yield put(ActionCreators.getMemberList.request({offset: member.list.offset}))
	} catch (e) {
		yield put(ActionCreators.deleteMember.failure(e));
	}
}

function* patchMember(action: ReturnType<typeof ActionCreators.patchMember.request>) {
	try {
		const group = yield select(selectGroup);
		const member = yield select(selectMember);
		const {uuid, permission} = action.payload
		const [data,error] = yield call(fetchPatch, `groups/${group.selectedId}/members/${uuid}`, {permission});
		yield put(ActionCreators.getMemberList.request({offset: member.list.offset}))
	} catch (e) {
		yield put(ActionCreators.patchMember.failure(e));
	}
}

const memberSaga = [
	takeLatest(MemberActionType.GET_MEMBER_LIST_REQUEST, getMemberList),
	takeLatest(MemberActionType.GET_MEMBER_SEARCH_REQUEST, getMemberSearch),
	takeLatest(MemberActionType.POST_MEMBER_REQUEST, postMember),
	takeLatest(MemberActionType.PATCH_MEMBER_REQUEST, patchMember),
	takeLatest(MemberActionType.DELETE_MEMBER_REQUEST, deleteMember),
];

export default memberSaga;
