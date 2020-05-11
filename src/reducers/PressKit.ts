import PressKitActionType from '../actions/PressKit/ActionType';
import PressKitAction from '../actions/PressKit/Action';
import {
	PressKitListModel, PressKitModel, PressKitRequestModel, PressKitCreateModel
} from "../model/PressKitModel";
import createReducer from "./createReducer";
import { combineReducers } from "redux";
import { ListModel } from '../model/ListModel'

const now = new Date()
const initialStateDetail: PressKitModel = {
	id: "",
	body: {
		component: [],
		html: '',
		style: [],
		css: ''
	},
	create_user: {
		first_name: "",
		last_name: "",
        src: "",
        color_cd: "",
	},
	create_at: now,
	name: '',
    fetched: false,
};

const detail = createReducer<PressKitModel>(initialStateDetail, {
	[PressKitActionType.GET_PRESS_KIT_LIST_SUCCEEDED](state: PressKitListModel[], action: PressKitAction) {
		//　一覧開いたときに初期化
		return initialStateDetail
	},
	[PressKitActionType.GET_PRESS_KIT_DETAILS_REQUEST](state: PressKitModel, action: PressKitAction) {
		return {
			...state,
			fetched: false,
		}
	},
	[PressKitActionType.GET_PRESS_KIT_DETAILS_SUCCEEDED](state: PressKitModel, action: PressKitAction) {
		const result:any = action.payload
		return {
            ...result,
            fetched: true,
		}
	},
	[PressKitActionType.POST_PRESS_KIT_DETAILS_REQUEST](state: PressKitRequestModel, action: PressKitAction) {
		return {
			...state,
			fetched: false
		}
	},
    [PressKitActionType.POST_PRESS_KIT_DETAILS_SUCCEEDED](state: PressKitRequestModel, action: PressKitAction) {
		const result:any = action.payload
        return {
            ...state,
            fetched: true,
        }
    },
	[PressKitActionType.SET_PRESS_KIT_DETAILS](state: PressKitModel, action: PressKitAction) {
		const result:any = action.payload
        return {
			...state,
			body: result.body
        }
	},
	[PressKitActionType.SET_PRESS_KIT_NAME](state: PressKitModel, action: PressKitAction) {
		return {
			...state,
			name: action.payload,
		}
	}
});

const initialStatePageList: ListModel = {
	results: [],
	offset: 0,
	count: 0
}


const list = createReducer<ListModel>(initialStatePageList, {
    [PressKitActionType.GET_PRESS_KIT_LIST_SUCCEEDED](state: ListModel, action: PressKitAction) {
        return action.payload
    }
});


const initialStateCreate:  PressKitCreateModel = {
	dialog: false,
	template: {
		body: {
			component: [],
			html: '',
			style: [],
			css: '',
		},
		name: ''
	},
	historyList: []
};


const create = createReducer<PressKitCreateModel>(initialStateCreate, {
	[PressKitActionType.SET_PRESS_KIT_CREATE_DIALOG](state: PressKitCreateModel, action: PressKitAction) {
		return {
			...state,
			dialog :action.payload
		}
	},
	[PressKitActionType.GET_PRESS_KIT_TEMPLATE_SUCCEEDED](state: PressKitCreateModel, action: PressKitAction) {
		return {
			...state,
			template :action.payload
		}
	},
	[PressKitActionType.GET_PRESS_KIT_TEMPLATE_LIST_SUCCEEDED](state: PressKitCreateModel, action: PressKitAction) {
	return {
		...state,
		template :action.payload[0].history,
		historyList :action.payload
	}
}
});


export const pressKit = combineReducers({
    list,
	detail,
	create
});
