import ActionType from './ActionType';
import { BlockModel, BlockRequestModel, BlockListRequestModel } from '../../model/BlockModel';
import { createAsyncAction } from 'typesafe-actions';

export const getBlock = createAsyncAction(
	ActionType.GET_BLOCK_REQUEST,
	ActionType.GET_BLOCK_SUCCEEDED,
	ActionType.GET_BLOCK_FAILED
)<BlockListRequestModel, BlockModel[], Error>();

export const postBlock = createAsyncAction(
	ActionType.POST_BLOCK_REQUEST,
	ActionType.POST_BLOCK_SUCCEEDED,
	ActionType.POST_BLOCK_FAILED
)<BlockModel, BlockModel, Error>();

export const patchBlock = createAsyncAction(
	ActionType.PATCH_BLOCK_REQUEST,
	ActionType.PATCH_BLOCK_SUCCEEDED,
	ActionType.PATCH_BLOCK_FAILED
)<BlockRequestModel, BlockModel, Error>();

export const deleteBlock = createAsyncAction(
	ActionType.DELETE_BLOCK_REQUEST,
	ActionType.DELETE_BLOCK_SUCCEEDED,
	ActionType.DELETE_BLOCK_FAILED
)<BlockRequestModel, BlockModel, Error>();
