import ActionType from './ActionType';
import { MeModel,ProfileImageRequestModel, passwordRequestModel } from '../../model/MeModel';
import { createAsyncAction } from 'typesafe-actions';

export const getMe = createAsyncAction(
	ActionType.GET_ME_REQUEST,
	ActionType.GET_ME_SUCCEEDED,
	ActionType.GET_ME_FAILED,
)<void, MeModel, Error>();

export const patchMe = createAsyncAction(
	ActionType.PATCH_ME_REQUEST,
	ActionType.PATCH_ME_SUCCEEDED,
	ActionType.PATCH_ME_FAILED,
)<MeModel, null, Error>();

export const patchProfileImage = createAsyncAction(
	ActionType.PATCH_PROFILE_IMAGE_REQUEST,
	ActionType.PATCH_PROFILE_IMAGE_SUCCEEDED,
	ActionType.PATCH_PROFILE_IMAGE_FAILED,
)<ProfileImageRequestModel, null, Error>();

export const patchPassword = createAsyncAction(
	ActionType.PATCH_PASSWORD_REQUEST,
	ActionType.PATCH_PASSWORD_SUCCEEDED,
	ActionType.PATCH_PASSWORD_FAILED,
)<passwordRequestModel, null, Error>();
