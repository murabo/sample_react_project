import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchPost, fetchGet, fetchDelete, fetchPatch, getJson } from "./fetch";
import { push } from 'connected-react-router'
import { selectPressKit, selectGroup, selectRouter } from "./selector";

// action
import PressKitActionType from '../actions/PressKit/ActionType';
import * as ActionCreators from '../actions/PressKit/ActionCreator';
import { PressKitListRequestModel } from '../model/PressKitModel';

// 一覧取得
function* getPressKitList(action: ReturnType<typeof ActionCreators.getPressKitList.request>) {
    try {
        const group = yield select(selectGroup);
        const router = yield select(selectRouter);
        const request: PressKitListRequestModel = action.payload
        let offset = request.offset
        offset = offset <= 1 ? 0 : (offset * 10) - 10
        const archive = router.location.pathname.indexOf('archive') > -1 ? 1: 0
        const [data, error] = yield call(fetchGet, `groups/${group.selectedId}/press_kit/?is_archive=${archive}&offset=${offset}&limit=10`)
        yield put(ActionCreators.getPressKitList.success(Object.assign({}, { offset: action.payload.offset }, data)))
    } catch (e) {
        yield put(ActionCreators.getPressKitList.failure(e));
    }
}

// 詳細取得
function* getPressKitDetails(action: ReturnType<typeof ActionCreators.getPressKitDetails.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_kit/${action.payload.id}/`);
        yield put(ActionCreators.getPressKitDetails.success(data))
    } catch (e) {
        yield put(push('/press_kit/'))
    }
}

// 保存
function* postPressKitDetails(action: ReturnType<typeof ActionCreators.postPressKitDetails.request>) {

    try {
        const pressKit = yield select(selectPressKit);
        const group = yield select(selectGroup);
        const request = {body: pressKit.detail.body, name: pressKit.detail.name || '未タイトル'}
    	if (pressKit.detail.id){
            const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/press_kit/${pressKit.detail.id}`, request);
        } else {
            const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_kit`,　request);
            yield put(push(`/press_kit/${group.selectedId}/detail/${data.id}/edit/`))
        }

    } catch (e) {
        yield put(ActionCreators.postPressKitDetails.failure(e));
    }
}


// 複製
function* postPressKitClone(action: ReturnType<typeof ActionCreators.postPressKitClone.request>) {
    let request = action.payload
    try {
        const group = yield select(selectGroup);
        const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_kit`, request);
        yield put(ActionCreators.getPressKitList.request({ offset: 0 }))
    } catch (e) {
        yield put(ActionCreators.postPressKitDetails.failure(e));
    }
}

// 削除
function* deletePressKitDetails(action: ReturnType<typeof ActionCreators.deletePressKitDetails.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchDelete, `groups/${group.selectedId}/press_kit/${action.payload.id}/`);
        yield put(ActionCreators.deletePressKitDetails.success(data))
        yield put(ActionCreators.getPressKitList.request({ offset: 0 }))
    } catch (e) {
        yield put(ActionCreators.deletePressKitDetails.failure(e));
    }
}


// テンプレート取得
function* getPressKitTemplate(action: ReturnType<typeof ActionCreators.getPressKitTemplate.request>) {
    try {
        const data = yield call(getJson, action.payload);
        yield put(ActionCreators.getPressKitTemplate.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressKitTemplate.failure(e));
    }
}

// 一覧取得
function* getPressKitTemplateList(action: ReturnType<typeof ActionCreators.getPressKitTemplateList.request>) {
    try {
        const group = yield select(selectGroup);
        const [data,error] = yield call(fetchGet, `groups/${group.selectedId}/press_kit/`);
        yield put(ActionCreators.getPressKitTemplateList.success(data))
    } catch (e) {
        yield put(ActionCreators.getPressKitTemplateList.failure(e));
    }
}


// 編集
function* patchPressKitDetails(action: ReturnType<typeof ActionCreators.patchPressKitDetails.request>) {
    try {
        const pressKit = yield select(selectPressKit);
        const group = yield select(selectGroup);
        const { is_public, is_archive, id } = action.payload
        const request: any = {}
        if (is_public) request.is_public = is_public
        if (is_archive) request.is_archive = is_archive
        const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/press_kit/${id}`, request);
        yield put(ActionCreators.patchPressKitDetails.success(data));
        yield put(ActionCreators.getPressKitList.request({ offset: 0 }))
    } catch (e) {
        yield put(ActionCreators.patchPressKitDetails.failure(e));
    }
}


// アーカイブ
function* patchPressKitName(action: ReturnType<typeof ActionCreators.patchPressKitName.request>) {
    let request = action.payload
    try {
        const pressKit = yield select(selectPressKit);
        const group = yield select(selectGroup);
        const [data,error]= yield call(fetchPatch, `groups/${group.selectedId}/press_kit/${pressKit.detail.id}`, {name: pressKit.detail.name});
        yield put(ActionCreators.getPressKitList.request({ offset: 0 }))
    } catch (e) {
        yield put(ActionCreators.patchPressKitName.failure(e));
    }
}

const PressKitSaga = [
    takeLatest(PressKitActionType.GET_PRESS_KIT_LIST_REQUEST, getPressKitList),
	takeLatest(PressKitActionType.GET_PRESS_KIT_DETAILS_REQUEST, getPressKitDetails),
	takeLatest(PressKitActionType.POST_PRESS_KIT_DETAILS_REQUEST, postPressKitDetails),
    takeLatest(PressKitActionType.PATCH_PRESS_KIT_DETAILS_REQUEST, patchPressKitDetails),
    takeLatest(PressKitActionType.POST_PRESS_KIT_CLONE_REQUEST, postPressKitClone),
    takeLatest(PressKitActionType.DELETE_PRESS_KIT_DETAILS_REQUEST, deletePressKitDetails),
    takeLatest(PressKitActionType.GET_PRESS_KIT_TEMPLATE_REQUEST, getPressKitTemplate),
    takeLatest(PressKitActionType.GET_PRESS_KIT_TEMPLATE_LIST_REQUEST, getPressKitTemplateList),
    takeLatest(PressKitActionType.PATCH_PRESS_KIT_NAME_REQUEST, patchPressKitName),
];

export default PressKitSaga;
