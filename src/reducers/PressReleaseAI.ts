import ActionType from '../actions/PressReleaseAI/ActionType';
import Action from '../actions/PressReleaseAI/Action';
import {
	PressReleaseCheckModel,
	PressReleaseTitleSuggestModel
} from "../model/PressReleaseAIModel";

import createReducer from "./createReducer";
import { combineReducers } from "redux";

const initialState: PressReleaseCheckModel = {
	fetched: false,
	result: [],
};

const check = createReducer<PressReleaseCheckModel>(initialState, {
	[ActionType.POST_PRESS_RELEASE_CHECK_REQUEST](state: PressReleaseCheckModel, action: Action) {
		return {
			result: [],
			fetched:false,
		}
	},
	[ActionType.POST_PRESS_RELEASE_CHECK_SUCCEEDED](state: PressReleaseCheckModel, action: Action) {
		return {
			result: action.payload,
			fetched:true,
		}
	}
});

const titleSuggest = createReducer<PressReleaseCheckModel>(initialState, {
	[ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_REQUEST](state: PressReleaseTitleSuggestModel, action: Action) {
		return {
			result: [],
			fetched:false,
		}
	},
	[ActionType.POST_PRESS_RELEASE_TITLE_SUGGEST_SUCCEEDED](state: PressReleaseTitleSuggestModel, action: Action) {
		return {
			result: action.payload,
			fetched:true,
		}
	}
});


export const pressReleaseAI = combineReducers({
	check,
	titleSuggest
});
