import ActionType from './ActionType';
import { BlockModel, BlockRequestModel } from '../../model/NotificationModel';
import { createAsyncAction } from 'typesafe-actions';

export const getNotification = createAsyncAction(
	ActionType.GET_NOTIFICATION_REQUEST,
	ActionType.GET_NOTIFICATION_SUCCEEDED,
	ActionType.GET_NOTIFICATION_FAILED
)<void, BlockModel[], Error>();

export const postBlock = createAsyncAction(
	ActionType.POST_NOTIFICATION_REQUEST,
	ActionType.POST_NOTIFICATION_SUCCEEDED,
	ActionType.POST_NOTIFICATION_FAILED
)<BlockModel, BlockModel, Error>();

export const patchBlock = createAsyncAction(
	ActionType.PATCH_NOTIFICATION_REQUEST,
	ActionType.PATCH_NOTIFICATION_SUCCEEDED,
	ActionType.PATCH_NOTIFICATION_FAILED
)<BlockRequestModel, BlockModel, Error>();

export const deleteBlock = createAsyncAction(
	ActionType.DELETE_NOTIFICATION_REQUEST,
	ActionType.DELETE_NOTIFICATION_SUCCEEDED,
	ActionType.DELETE_NOTIFICATION_FAILED
)<BlockRequestModel, BlockModel, Error>();
