import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchPost, fetchGet, fetchDelete } from "./fetch";
import { selectPressRelease, selectPressReleaseReserve, selectGroup } from "./selector";

// action
import ActionType from '../actions/PressReleaseReserve/ActionType';
import * as ActionCreators from '../actions/PressReleaseReserve/ActionCreator';
import * as PressReleaseActionCreators from '../actions/PressRelease/ActionCreator';
import * as PressReleasePublishActionCreators from '../actions/PressReleasePublish/ActionCreator';

const now = new Date()

// 詳細取得
function* getPressReleaseReserve(action: ReturnType<typeof ActionCreators.getPressReleaseReserve.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/custom_medias/?limit=1000&offset=0/`);
        yield put(ActionCreators.getPressReleaseCustomMedia.success(data.results))
        let { press_id }  = action.payload
        const [data2,error2] = yield call(fetchGet, `groups/${group.selectedId}/press_info/${press_id}/reserve/`);
        yield put(ActionCreators.getPressReleaseReserve.success(data2))
        if (Object.keys(data2).length) {
            yield put(PressReleasePublishActionCreators.getPressReleasePublish.request())
        }
    } catch (e) {
        yield put(ActionCreators.getPressReleaseReserve.failure(e));
    }
}

// 保存
function* postPressReleaseReserve(action: ReturnType<typeof ActionCreators.postPressReleaseReserve.request>) {

    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const reserve = yield select(selectPressReleaseReserve);
        let { press_id }  = pressRelease.detail
        const request:any = action.payload
        let auto = {}
        if (reserve.data.auto.is_send) {
            auto = reserve.data.auto
        } else {
            auto = {
                ...reserve.data.auto,
                id_list: [],
            }
        }
        const send = {
            auto_media: auto,
            custom_media: reserve.data.custom.filter(item => item.is_send === true),
            released_at: reserve.data.released_at,
            comment: request.comment,
            reviewer :request.reviewer|| []
        }
        if (request.deadline_at) Object.assign(send, {deadline_at :request.deadline_at})
        const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/press_info/${press_id}/reserve`, send);
        yield put(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: press_id}))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseReserve.failure(e));
    }
}

// 削除
function* deletePressReleaseReserve(action: ReturnType<typeof ActionCreators.deletePressReleaseReserve.request>) {

    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        let { press_id }  = pressRelease.detail
        yield call(fetchDelete, `groups/${group.selectedId}/press_info/${press_id}/reserve/latest`);
        yield put(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: press_id}))
    } catch (e) {
        yield put(ActionCreators.deletePressReleaseReserve.failure(e));
    }
}


// 自動選定メディアレコメンド
function* postPressReleaseMediaReccomend(action: ReturnType<typeof ActionCreators.postPressReleaseMediaRecommend.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const request = Object.assign(action.payload, {uuid:pressRelease.detail.press_id})
        const [data,error] = yield call(fetchPost, `media_recommend`, request);
        yield put(ActionCreators.postPressReleaseMediaRecommend.success({
            id_list: data.result,
            categories: request.categories,
            type: request.type,
        }));
    } catch (e) {
        yield put(ActionCreators.postPressReleaseMediaRecommend.failure(e));
    }
}

// 全メディア取得
function* getAutoMediaList(action: ReturnType<typeof ActionCreators.getPressReleaseAutoMedia.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/custom_medias/?limit=100&offset=0/`);
        yield put(ActionCreators.getPressReleaseAutoMedia.success(data.results))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseAutoMedia.failure(e));
    }
}


// 承認結果
function* postPressReleaseReserveReviewResult(action: ReturnType<typeof ActionCreators.postPressReleaseReserveReviewResult.request>) {
    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error] = yield call(fetchPost, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/reserve_status`, action.payload);
        yield put(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressRelease.detail.press_id}))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseReserveReviewResult.failure(e));
    }
}

const pressReleaseReserveSaga = [
	takeLatest(ActionType.GET_PRESS_RELEASE_RESERVE_REQUEST, getPressReleaseReserve),
	takeLatest(ActionType.POST_PRESS_RELEASE_RESERVE_REQUEST, postPressReleaseReserve),
    takeLatest(ActionType.POST_PRESS_RELEASE_MEDIA_RECOMMEND_REQUEST, postPressReleaseMediaReccomend),
    takeLatest(ActionType.DELETE_PRESS_RELEASE_RESERVE_REQUEST, deletePressReleaseReserve),
    takeLatest(ActionType.GET_PRESS_RELEASE_AUTO_MEDIA_REQUEST, getAutoMediaList),
    takeLatest(ActionType.POST_PRESS_RELEASE_RESERVE_REVIEW_RESULT_REQUEST, postPressReleaseReserveReviewResult),
];

export default pressReleaseReserveSaga;
