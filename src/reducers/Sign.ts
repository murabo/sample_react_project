import AssetActionType from '../actions/Asset/ActionType';
import AssetAction from '../actions/Asset/Action';
import { AssetModel } from "../model/AssetModel";
import createReducer from "./createReducer";

export const asset = createReducer<AssetModel[]>([], {
	[AssetActionType.GET_ASSET_SUCCEEDED](state: AssetModel[], action: AssetAction) {
		return action.payload;
	},
	[AssetActionType.POST_ASSET_SUCCEEDED](state: AssetModel[], action: AssetAction) {
		return action.payload
	}
});
