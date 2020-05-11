import ActionType from './ActionType';
import { InviteRequestModel } from '../../model/InviteModel';
import { createAsyncAction } from 'typesafe-actions';

export const postAsset = createAsyncAction(
	ActionType.POST_INVITE_SUCCEEDED,
	ActionType.POST_INVITE_SUCCEEDED,
	ActionType.POST_INVITE_FAILED,
)<InviteRequestModel, null, Error>();
