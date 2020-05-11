import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchGet, fetchPostForm, fetchDelete } from "./fetch";

import AssetActionType from '../actions/Asset/ActionType';
import * as ActionCreators from '../actions/Asset/ActionCreator';
import { selectAsset, selectGroup } from "./selector";
import { AssetListRequestModel } from "../model/AssetModel";

function* getAsset(action: ReturnType<typeof ActionCreators.getAsset.request>) {
    try {
        const group = yield select(selectGroup);
        const request:AssetListRequestModel = action.payload
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset * 10) - 10
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/image/?offset=${offset}&limit=10`);
        yield put(ActionCreators.getAsset.success(Object.assign({}, {offset: request.offset}, data)))

    } catch (e) {
        yield put(ActionCreators.getAsset.failure(e));
    }
}

function* postAsset(action: ReturnType<typeof ActionCreators.postAsset.request>) {
    try {

        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchPostForm, `groups/${group.selectedId}/image`, action.payload);
        const asset = yield select(selectAsset);
        yield put(ActionCreators.getAsset.request({offset: asset.offset}))
    } catch (e) {
        yield put(ActionCreators.postAsset.failure(e));
    }
}

function* deleteAsset(action: ReturnType<typeof ActionCreators.deleteAsset.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/image/${action.payload.id}/`);
        const asset = yield select(selectAsset);
        yield put(ActionCreators.getAsset.request({offset: asset.offset}))
    } catch (e) {
        yield put(ActionCreators.deleteAsset.failure(e));
    }
}

const assetSaga = [
	takeLatest(AssetActionType.GET_ASSET_REQUEST, getAsset),
	takeLatest(AssetActionType.POST_ASSET_REQUEST, postAsset),
    takeLatest(AssetActionType.DELETE_ASSET_REQUEST, deleteAsset),
	];

export default assetSaga;
