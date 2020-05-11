import ActionType from './ActionType';
import { ResetModel, ResetRequestModel } from '../../model/ResetModel';
import { createAsyncAction } from 'typesafe-actions';

export const fetchAsset = createAsyncAction(
	ActionType.GET_ASSET_REQUEST,
	ActionType.GET_ASSET_SUCCEEDED,
	ActionType.GET_ASSET_FAILED,
)<ResetModel, ResetRequestModel, Error>();

export const postAsset = createAsyncAction(
	ActionType.POST_ASSET_REQUEST,
	ActionType.POST_ASSET_SUCCEEDED,
	ActionType.POST_ASSET_FAILED,
)<ResetModel, ResetModel, Error>();
