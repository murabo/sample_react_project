import createReducer from "./createReducer";
import ActionType from "../actions/Preview/ActionType";
import Action from "../actions/Preview/Action";
import { PREVIEW_TYPE_DESKTOP} from "../config/preview_type";

export const preview = createReducer<string>(PREVIEW_TYPE_DESKTOP, {
	[ActionType.SET_PREVIEW_TYPE](state: string, action: Action) {
		return action.payload;
	}
});
