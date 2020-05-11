import ActionType from './ActionType';
import { MediaModel, MediaListModel, MediaRequestModel, MediaListRequestModel} from '../../model/MediaModel';
import { createAsyncAction } from 'typesafe-actions';

export const getMediaList = createAsyncAction(
	ActionType.GET_MEDIA_LIST_REQUEST,
	ActionType.GET_MEDIA_LIST_SUCCEEDED,
	ActionType.GET_MEDIA_LIST_FAILED,
)<MediaListRequestModel, MediaModel[], Error>();

export const getMediaAllList = createAsyncAction(
	ActionType.GET_MEDIA_ALL_LIST_REQUEST,
	ActionType.GET_MEDIA_ALL_LIST_SUCCEEDED,
	ActionType.GET_MEDIA_ALL_LIST_FAILED,
)<MediaListRequestModel, MediaListModel, Error>();

export const getMediaDetail = createAsyncAction(
	ActionType.GET_MEDIA_DETAIL_REQUEST,
	ActionType.GET_MEDIA_DETAIL_SUCCEEDED,
	ActionType.GET_MEDIA_DETAIL_FAILED,
)<MediaRequestModel, MediaModel, Error>();

export const postMedia = createAsyncAction(
	ActionType.POST_MEDIA_REQUEST,
	ActionType.POST_MEDIA_SUCCEEDED,
	ActionType.POST_MEDIA_FAILED,
)<MediaModel, void, Error>();

export const patchMedia = createAsyncAction(
	ActionType.PATCH_MEDIA_REQUEST,
	ActionType.PATCH_MEDIA_SUCCEEDED,
	ActionType.PATCH_MEDIA_FAILED,
)<MediaModel, void, Error>();

export const deleteMedia = createAsyncAction(
	ActionType.DELETE_MEDIA_REQUEST,
	ActionType.DELETE_MEDIA_SUCCEEDED,
	ActionType.DELETE_MEDIA_FAILED,
)<MediaRequestModel, void, Error>();
