import ActionType from './ActionType';
import {
	PressReleaseGuestUserRequestModel,
} from "../../model/PressReleaseInviteModel";
import { createAsyncAction } from 'typesafe-actions';

export const postPressReleaseGuestUser = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_GUEST_USER_REQUEST,
	ActionType.POST_PRESS_RELEASE_GUEST_USER_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_GUEST_USER_FAILED
)<PressReleaseGuestUserRequestModel, void, Error>();

