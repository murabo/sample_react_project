import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchGet, fetchPatch, fetchPost } from "./fetch";

// action
import GroupActionType from '../actions/Group/ActionType';
import * as ActionCreators from '../actions/Group/ActionCreator';
import { selectCompany } from "./selector";

// 一覧取得
function* getGroupList(action: ReturnType<typeof ActionCreators.getGroupList.request>) {
    try {
        const [data,error] = yield call(fetchGet, `groups/`);
        yield put(ActionCreators.getGroupList.success(data.results))
    } catch (e) {
        yield put(ActionCreators.getGroupList.failure(e));
    }
}

// グループ追加
function* postGroup(action: ReturnType<typeof ActionCreators.postGroup.request>) {
    try {
        const company = yield select(selectCompany);
        const [data,error] = yield call(fetchPost, `companies/${company.uuid}/groups`, {name: action.payload.name});
        yield put(ActionCreators.getGroupList.request())
    } catch (e) {
        yield put(ActionCreators.postGroup.failure(e));
    }
}

// グループ名変更
function* patchGroup(action: ReturnType<typeof ActionCreators.patchGroup.request>) {
    try {
        const company = yield select(selectCompany);
        const [data,error] = yield call(fetchPatch, `companies/${company.uuid}/groups/${action.payload.uuid}`, {name: action.payload.name});
        yield put(ActionCreators.getGroupList.request())
    } catch (e) {
        yield put(ActionCreators.patchGroup.failure(e));
    }
}

const groupSaga = [
    takeLatest(GroupActionType.GET_GROUP_LIST_REQUEST, getGroupList),
    takeLatest(GroupActionType.POST_GROUP_REQUEST, postGroup),
    takeLatest(GroupActionType.PATCH_GROUP_REQUEST, patchGroup),
];

export default groupSaga;
