// actions
import MeActionType from '../actions/Me/ActionType';
import MeAction from '../actions/Me/Action';

// models
import { MeModel } from "../model/MeModel";

// state
import createReducer from "./createReducer";

const initialState: MeModel = {
    last_name: '',
    first_name: '',
    last_name_kana: '',
    first_name_kana: '',
    department: '',
    email: '',
    tel: '',
    img: '',
    color_cd: ''
};

export const me = createReducer<MeModel>(initialState, {
	[MeActionType.GET_ME_SUCCEEDED](state: MeModel, action: MeAction) {
        return action.payload
	},
    [MeActionType.PATCH_ME_SUCCEEDED](state: MeModel, action: MeAction) {
        return action.payload
    },
	[MeActionType.PATCH_PROFILE_IMAGE_SUCCEEDED](state: MeModel, action: MeAction) {
		const result:any = action.payload
		return {
			...state,
			img: result.img
		}
	}
});
