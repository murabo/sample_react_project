import ActionType from './ActionType';
import { GroupListModel, GroupModel, GroupRequestModel } from "../../model/GroupModel";
import { createAsyncAction } from 'typesafe-actions';

export const getGroupList = createAsyncAction(
	ActionType.GET_GROUP_LIST_REQUEST,
	ActionType.GET_GROUP_LIST_SUCCEEDED,
	ActionType.GET_GROUP_LIST_FAILED,
)<void, GroupListModel[], Error>();

export const postGroup = createAsyncAction(
	ActionType.POST_GROUP_REQUEST,
	ActionType.POST_GROUP_SUCCEEDED,
	ActionType.POST_GROUP_FAILED,
)<GroupRequestModel, void, Error>();

export const patchGroup = createAsyncAction(
	ActionType.PATCH_GROUP_REQUEST,
	ActionType.PATCH_GROUP_SUCCEEDED,
	ActionType.PATCH_GROUP_FAILED,
)<GroupListModel, void, Error>();

export const setSelectedId = createAsyncAction(
	ActionType.SET_SELECTED_ID,
	'',
	'',
)<string, null, null>();
