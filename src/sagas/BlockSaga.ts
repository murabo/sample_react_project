import { takeLatest, put, call, select } from 'redux-saga/effects';
import BlockActionType from "../actions/Block/ActionType";
import * as ActionCreators from "../actions/Block/ActionCreator";
import {fetchPost, fetchGet, fetchPatch, fetchDelete} from "./fetch";
import { selectGroup, selectBlock } from "./selector";
import { BlockListRequestModel } from "../model/BlockModel";

function* getBlock(action: ReturnType<typeof ActionCreators.getBlock.request>) {
    try {
        const group = yield select(selectGroup);
        const request:BlockListRequestModel = action.payload
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset * 10) - 10
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/components/?offset=${offset}&limit=10`);
        yield put(ActionCreators.getBlock.success(Object.assign({}, {offset: request.offset}, data)))
    } catch (e) {
        yield put(ActionCreators.getBlock.failure(e));
    }
}

function* postBlock(action: ReturnType<typeof ActionCreators.postBlock.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/components`, action.payload);
        const block = yield select(selectBlock);
        yield put(ActionCreators.getBlock.request({offset: block.offset}))
    } catch (e) {
        yield put(ActionCreators.postBlock.failure(e));
    }
}

function* patchBlock(action: ReturnType<typeof ActionCreators.patchBlock.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchPatch, `groups/${group.selectedId}/components/${action.payload.id}`, action.payload);
        const block = yield select(selectBlock);
        yield put(ActionCreators.getBlock.request({offset: block.offset}))
    } catch (e) {
        yield put(ActionCreators.patchBlock.failure(e));
    }
}

function* deleteBlock(action: ReturnType<typeof ActionCreators.deleteBlock.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/components/${action.payload.id}/`);
        const block = yield select(selectBlock);
        yield put(ActionCreators.getBlock.request({offset: block.offset}))
    } catch (e) {
        yield put(ActionCreators.deleteBlock.failure(e));
    }
}

const blockSaga = [
	takeLatest(BlockActionType.GET_BLOCK_REQUEST, getBlock),
	takeLatest(BlockActionType.POST_BLOCK_REQUEST, postBlock),
	takeLatest(BlockActionType.PATCH_BLOCK_REQUEST, patchBlock),
	takeLatest(BlockActionType.DELETE_BLOCK_REQUEST, deleteBlock),
];

export default blockSaga;
