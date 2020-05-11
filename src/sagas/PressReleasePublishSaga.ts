import { takeLatest, put, call, select } from 'redux-saga/effects';
import {fetchGet, fetchPost} from "./fetch";
import {selectGroup, selectPressRelease, selectPressReleasePublish} from "./selector";

// action
import ActionType from '../actions/PressReleasePublish/ActionType';
import * as ActionCreators from '../actions/PressReleasePublish/ActionCreator';

// 取得
function* getPressReleasePublish(action: ReturnType<typeof ActionCreators.getPressReleasePublish.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        let { press_id }  = pressRelease.detail;
        const [data,error] = yield call(fetchGet, `press/publish/?press_id=${press_id}`);
        yield put(ActionCreators.getPressReleasePublish.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleasePublish.failure(e));
    }
}

// 保存
function* postPressReleasePublish(action: ReturnType<typeof ActionCreators.postPressReleasePublish.request>) {

    try {
        const publish = yield select(selectPressReleasePublish);
        const pressRelease = yield select(selectPressRelease);
        let { press_id }  = pressRelease.detail;
        const [data,error] = yield call(fetchPost, `press/publish`, { press_id: press_id, is_publish: publish.publish.is_publish });
        yield put(ActionCreators.postPressReleasePublish.success(data))
    } catch (e) {
        yield put(ActionCreators.postPressReleasePublish.failure(e));
    }
}

// 取得
function* getPressReleaseOGP(action: ReturnType<typeof ActionCreators.getPressReleaseOgp.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        let { press_id }  = pressRelease.detail;
        const [data,error] = yield call(fetchGet, `press/ogp/${press_id}`);
        yield put(ActionCreators.getPressReleaseOgp.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressReleaseOgp.failure(e));
    }
}

// 保存
function* postPressReleaseOGP(action: ReturnType<typeof ActionCreators.postPressReleaseOgp.request>) {
    try {
        const publish = yield select(selectPressReleasePublish);
        const pressRelease = yield select(selectPressRelease);
        let { press_id }  = pressRelease.detail;
        const [data,error] = yield call(fetchPost, `press/ogp`, { ...publish.ogp, press_id: press_id });
        yield put(ActionCreators.postPressReleaseOgp.success())
    } catch (e) {
        yield put(ActionCreators.postPressReleaseOgp.failure(e));
    }
}

const PressReleasePublishSaga = [
    takeLatest(ActionType.GET_PRESS_RELEASE_PUBLISH_REQUEST, getPressReleasePublish),
	takeLatest(ActionType.POST_PRESS_RELEASE_PUBLISH_REQUEST, postPressReleasePublish),
    takeLatest(ActionType.GET_PRESS_RELEASE_OGP_REQUEST, getPressReleaseOGP),
    takeLatest(ActionType.POST_PRESS_RELEASE_OGP_REQUEST, postPressReleaseOGP),
];

export default PressReleasePublishSaga;
