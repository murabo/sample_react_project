import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchPost} from "./fetch";
import { selectPressRelease, selectGroup } from "./selector";

// action
import ActionType from '../actions/PressReleaseInvite/ActionType';
import * as ActionCreators from '../actions/PressReleaseInvite/ActionCreator';
import * as PressReleaseActionCreators from '../actions/PressRelease/ActionCreator';
import PressReleaseActionType from "../actions/PressRelease/ActionType";

// 保存
function* postPressReleaseGuestUser(action: ReturnType<typeof ActionCreators.postPressReleaseGuestUser.request>) {

    try {
        const group = yield select(selectGroup);
        const pressRelease = yield select(selectPressRelease);
        const [data,error]= yield call(fetchPost, `groups/${group.selectedId}/press_info/${pressRelease.detail.press_id}/invite_guest`, action.payload);
        yield put(PressReleaseActionCreators.getPressReleaseDetails.request({press_id: pressRelease.detail.press_id}))
    } catch (e) {
        yield put(ActionCreators.postPressReleaseGuestUser.failure(e));
    }
}

const pressReleaseInviteSaga = [
	takeLatest(ActionType.POST_PRESS_RELEASE_GUEST_USER_REQUEST, postPressReleaseGuestUser),
];

export default pressReleaseInviteSaga;
