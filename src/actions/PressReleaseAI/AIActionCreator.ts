import ActionType from './ActionType';
import {
	PressReleaseCheckModel,
	PressReleaseTitleSuggestModel,
} from "../../model/PressReleaseAIModel";

import { createAsyncAction } from 'typesafe-actions';

export const postPressReleaseCheck = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_CHECK_REQUEST,
	ActionType.POST_PRESS_RELEASE_CHECK_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_CHECK_FAILED
)<any, PressReleaseCheckModel, Error>();

export const postPressReleaseTitleSuggest = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_REQUEST,
	ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_FAILED
)<void, PressReleaseTitleSuggestModel, Error>();
