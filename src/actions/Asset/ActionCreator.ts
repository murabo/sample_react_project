import ActionType from './ActionType';
import { AssetListRequestModel, AssetModel } from '../../model/AssetModel';
import { createAsyncAction } from 'typesafe-actions';

export const getAsset = createAsyncAction(
	ActionType.GET_ASSET_REQUEST,
	ActionType.GET_ASSET_SUCCEEDED,
	ActionType.GET_ASSET_FAILED,
)<AssetListRequestModel, AssetModel[], Error>();

export const postAsset = createAsyncAction(
	ActionType.POST_ASSET_REQUEST,
	ActionType.POST_ASSET_SUCCEEDED,
	ActionType.POST_ASSET_FAILED,
)<AssetModel, void, Error>();

export const deleteAsset = createAsyncAction(
    ActionType.DELETE_ASSET_REQUEST,
    ActionType.DELETE_ASSET_SUCCEEDED,
    ActionType.DELETE_ASSET_FAILED
)<AssetModel, void, Error>();
