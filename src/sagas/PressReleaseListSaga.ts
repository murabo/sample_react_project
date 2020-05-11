import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchGet } from "./fetch";
import { selectGroup } from "./selector";
import { PRESS_RELEASE_LIST_DISPLAY_COUNT } from '../config/list_display_count'

// action
import PressReleaseActionType from '../actions/PressRelease/ActionType';
import * as ActionCreators from '../actions/PressRelease/ActionCreator';
import { PressReleaseListRequestModel } from "../model/PressReleaseModel";

// 一覧取得
function* getPressReleaseList(action: ReturnType<typeof ActionCreators.getPressReleaseList.request>) {
    try {
        const group = yield select(selectGroup);
        const request:PressReleaseListRequestModel = action.payload
        const displayCount = PRESS_RELEASE_LIST_DISPLAY_COUNT
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset - 1) * displayCount
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/search/?offset=${offset}&limit=${displayCount}`);
        yield put(ActionCreators.getPressReleaseList.success(Object.assign({}, {offset: request.offset}, data, { displayCount })))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseList.failure(e));
    }
}

// 公開済み一覧取得
function* getPressReleaseListPublic(action: ReturnType<typeof ActionCreators.getPressReleaseListPublic.request>) {
    try {
        const group = yield select(selectGroup);
        const request:PressReleaseListRequestModel = action.payload
        const displayCount = PRESS_RELEASE_LIST_DISPLAY_COUNT
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset - 1) * displayCount
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/search/?offset=${offset}&limit=${displayCount}is_public=1`);
        yield put(ActionCreators.getPressReleaseListPublic.success(Object.assign({}, {offset: request.offset}, data, { displayCount })))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseListPublic.failure(e));
    }
}

// アーカイブ一覧取得
function* getPressReleaseListArchive(action: ReturnType<typeof ActionCreators.getPressReleaseListArchive.request>) {
    try {
        const group = yield select(selectGroup);
        const request:PressReleaseListRequestModel = action.payload
        const displayCount = PRESS_RELEASE_LIST_DISPLAY_COUNT
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset - 1) * displayCount
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/search/?offset=${offset}&limit=${displayCount}is_archive=1`);
        yield put(ActionCreators.getPressReleaseListArchive.success(Object.assign({}, {offset: request.offset}, data, { displayCount })))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseListArchive.failure(e));
    }
}



const pressReleaseListSaga = [
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_LIST_REQUEST, getPressReleaseList),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_LIST_PUBLIC_REQUEST, getPressReleaseListPublic),
    takeLatest(PressReleaseActionType.GET_PRESS_RELEASE_LIST_ARCHIVE_REQUEST, getPressReleaseListArchive),
];

export default pressReleaseListSaga;
