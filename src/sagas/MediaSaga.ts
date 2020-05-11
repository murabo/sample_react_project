import { takeLatest, put, call, select } from 'redux-saga/effects';
import { diff } from "deep-object-diff";
import { selectMedia, selectGroup } from "./selector";
import {fetchGet, fetchPatch, fetchDelete, fetchPost} from "./fetch";
import { startSubmit, stopSubmit, reset } from 'redux-form'

// actions
import MediaActionType from '../actions/Media/ActionType';
import * as ActionCreators from '../actions/Media/ActionCreator';
import { push } from "connected-react-router";
import { MediaListRequestModel } from "../model/MediaModel";

function* getMediaList(action: ReturnType<typeof ActionCreators.getMediaList.request>) {
	try {
        const group = yield select(selectGroup);
		const request:MediaListRequestModel = action.payload
		let offset = request.offset
		offset = offset <= 1 ? 0 : (offset * 10) - 10
		const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/custom_medias/?offset=${offset}`);
		yield put(ActionCreators.getMediaList.success(Object.assign({}, {offset: request.offset}, data)))
	} catch (e) {
		yield put(ActionCreators.getMediaList.failure(e));
	}
}

function* getMediaAllList(action: ReturnType<typeof ActionCreators.getMediaAllList.request>) {
	try {
		const group = yield select(selectGroup);
		const request:MediaListRequestModel = action.payload;
		let offset = request.offset;
		offset = offset <= 1 ? 0 : (offset * 10) - 10
		const [data,error] = yield call(fetchGet, `medias/?offset=${offset}&limit=${request.limit || 10}`);
		yield put(ActionCreators.getMediaAllList.success(Object.assign({}, {offset: request.offset as number}, {results: data})))
	} catch (e) {
		yield put(ActionCreators.getMediaAllList.failure(e));
	}
}

function* getMediaDetail(action: ReturnType<typeof ActionCreators.getMediaDetail.request>) {
	try {
		const group = yield select(selectGroup);
		const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/custom_medias/${action.payload.id}/`);
		yield put(ActionCreators.getMediaDetail.success(data))
	} catch (e) {
		yield put(push('/press_release/'))
	}
}

function* postMedia(action: ReturnType<typeof ActionCreators.postMedia.request>) {
	try {
        const group = yield select(selectGroup);
		const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/custom_medias`, action.payload);
		if(data && !error){
			yield put(stopSubmit('MEDIA'));
			yield put(reset('MEDIA'));
			yield put(push('/media/'));
		}else{
			yield put(stopSubmit('MEDIA', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.postMedia.failure(e));
	}
}

function* patchMedia(action: ReturnType<typeof ActionCreators.patchMedia.request>) {
	yield put(startSubmit('MEDIA'));
	try {
		const media = yield select(selectMedia);
        const group = yield select(selectGroup);
		const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/custom_medias/${action.payload.id}`, diff(media.detail, action.payload));
		if(data && !error){
			yield put(stopSubmit('MEDIA'));
			yield put(reset('MEDIA'));
			yield put(push('/media/'));
		}else{
			yield put(stopSubmit('MEDIA', Object.assign(error, {_error: error.non_field_errors})));
		}
	} catch (e) {
		yield put(ActionCreators.patchMedia.failure(e));
	}
}

function* deleteMedia(action: ReturnType<typeof ActionCreators.deleteMedia.request>) {
	try {
        const group = yield select(selectGroup);
		const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/custom_medias/${action.payload.id}`);
		yield put(ActionCreators.getMediaList.request({offset: 0}))
	} catch (e) {
		yield put(ActionCreators.deleteMedia.failure(e));
	}
}

const mediaSaga = [
	takeLatest(MediaActionType.GET_MEDIA_LIST_REQUEST, getMediaList),
	takeLatest(MediaActionType.GET_MEDIA_DETAIL_REQUEST, getMediaDetail),
	takeLatest(MediaActionType.POST_MEDIA_REQUEST, postMedia),
	takeLatest(MediaActionType.PATCH_MEDIA_REQUEST, patchMedia),
	takeLatest(MediaActionType.DELETE_MEDIA_REQUEST, deleteMedia),
	takeLatest(MediaActionType.GET_MEDIA_ALL_LIST_REQUEST, getMediaAllList),
];

export default mediaSaga;
