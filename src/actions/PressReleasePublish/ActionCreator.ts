import ActionType from './ActionType';
import {
	PressReleaseOGPModel,
	PressReleasePublishModel
} from "../../model/PressReleasePublishModel";
import { createAsyncAction } from 'typesafe-actions';


export const getPressReleasePublish = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_PUBLISH_REQUEST,
	ActionType.GET_PRESS_RELEASE_PUBLISH_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_PUBLISH_FAILED
)<void, void, Error>();

export const postPressReleasePublish = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_PUBLISH_REQUEST,
	ActionType.POST_PRESS_RELEASE_PUBLISH_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_PUBLISH_FAILED
)<void, void, Error>();

export const setPressReleasePublish = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_PUBLISH,
	"",
	"",
)<PressReleasePublishModel, void, Error>();


export const getPressReleaseOgp = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_OGP_REQUEST,
	ActionType.GET_PRESS_RELEASE_OGP_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_OGP_FAILED
)<void, void, Error>();


export const postPressReleaseOgp = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_OGP_REQUEST,
	ActionType.POST_PRESS_RELEASE_OGP_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_OGP_FAILED
)<void, void, Error>();

export const setPressReleaseOgp = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_OGP,
	"",
	"",
)<PressReleaseOGPModel, void, Error>();
