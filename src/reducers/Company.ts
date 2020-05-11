// actions
import CompanyActionType from '../actions/Company/ActionType';
import CompanyAction from '../actions/Company/Action';

// models
import { CompanyModel } from "../model/CompanyModel";

// state
import createReducer from "./createReducer";

const initialState: CompanyModel = {
	name: "",
	postal_code:"",
	address: "",
	tel: "",
	fax: "",
	email: "",
	url: "",
	img: "",
	is_public_page: "false",
};

export const company = createReducer<CompanyModel>(initialState, {
	[CompanyActionType.GET_COMPANY_SUCCEEDED](state: CompanyModel, action: CompanyAction) {
		const result:any = action.payload
		const detail = result.length ? result[0]: state
		detail.is_public_page = String(detail.is_public_page)
		return detail
	},
	[CompanyActionType.POST_COMPANY_SUCCEEDED](state: CompanyModel, action: CompanyAction) {
		const result:any = action.payload
		return {
			...action.payload,
			is_public_page: String(result.is_public_page)
		}
	},
    [CompanyActionType.PATCH_COMPANY_SUCCEEDED](state: CompanyModel, action: CompanyAction) {
		const result:any = action.payload
		return {
			...action.payload,
			is_public_page: String(result.is_public_page)
		}
    },
	[CompanyActionType.PATCH_LOGO_SUCCEEDED](state: CompanyModel, action: CompanyAction) {
		const result:any = action.payload
		return {
			...state,
			img: result.img
		}
	}
});
