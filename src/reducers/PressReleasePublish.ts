import ActionType from '../actions/PressReleasePublish/ActionType';
import Action from '../actions/PressReleasePublish/Action';
import {
	PressReleasePublishModel,
	PressReleaseOGPModel
} from "../model/PressReleasePublishModel";

import createReducer from "./createReducer";
import { combineReducers } from "redux";


const publish = createReducer<PressReleasePublishModel>({is_publish: 0}, {
	[ActionType.SET_PRESS_RELEASE_PUBLISH](state: PressReleasePublishModel, action: Action) {
		return action.payload
	},
	[ActionType.GET_PRESS_RELEASE_OGP_SUCCEEDED](state: PressReleasePublishModel, action: Action) {
		return action.payload
	},
});

const initOgp = {
	press_id: "",
	ogp_url: "",
	ogp_title: "",
	ogp_description: "",
	is_publish: 0
}

const ogp = createReducer<PressReleaseOGPModel>(initOgp, {
	[ActionType.SET_PRESS_RELEASE_OGP](state: PressReleaseOGPModel, action: Action) {
		const req = action.payload
		return {
			...state,
			...req
		}
	},
	[ActionType.GET_PRESS_RELEASE_OGP_SUCCEEDED](state: PressReleaseOGPModel, action: Action) {
		const req = action.payload
		return {
			...state,
			...req
		}
	},
});

export const pressReleasePublish = combineReducers({
	publish,
	ogp
});
