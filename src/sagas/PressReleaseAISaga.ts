import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchGet, fetchPost } from "./fetch";
import { selectGroup, selectPressRelease } from "./selector";

// action
import ActionType from '../actions/PressReleaseAI/ActionType';
import * as ActionCreators from '../actions/PressReleaseAI/AIActionCreator';

// 内容チェック
function* postPressReleaseCheck(action: ReturnType<typeof ActionCreators.postPressReleaseCheck.request>) {
    try {
        const [data,error] = yield call(fetchPost, `check_variants`, {"sentence":action.payload});
        yield put(ActionCreators.postPressReleaseCheck.success(data.results))
        console.log(data)
    } catch (e) {
        yield put(ActionCreators.postPressReleaseCheck.failure(e));
    }
}

// 内容チェック
function* postPressReleaseTitleSuggest(action: ReturnType<typeof ActionCreators.postPressReleaseTitleSuggest.request>) {
    try {
        const pressRelease = yield select(selectPressRelease);
        const request = pressRelease.detail.body.html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
        const [data,error] = yield call(fetchPost, `title_suggest`, {"text": request});
        yield put(ActionCreators.postPressReleaseTitleSuggest.success(data.results))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseTitleSuggest.failure(e));
    }
}

const pressReleaseAISaga = [
    takeLatest(ActionType.POST_PRESS_RELEASE_CHECK_REQUEST, postPressReleaseCheck),
    takeLatest(ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_REQUEST, postPressReleaseTitleSuggest),
    takeLatest(ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_REQUEST, postPressReleaseTitleSuggest),
];

export default pressReleaseAISaga;
