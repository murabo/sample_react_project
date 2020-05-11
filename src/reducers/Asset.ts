import AssetActionType from '../actions/Asset/ActionType';
import AssetAction from '../actions/Asset/Action';
import { AssetModel, AssetListModel } from "../model/AssetModel";
import createReducer from "./createReducer";

const initialStateAsset: AssetListModel = {
	results : [],
	offset: 0,
	count: 0
};

export const asset = createReducer<AssetListModel>(initialStateAsset, {
	[AssetActionType.GET_ASSET_SUCCEEDED](state: AssetListModel, action: AssetAction) {
		const newList:any = []
		const result:any = action.payload
		result.results.map( (value:AssetModel)  => {
			const category = value.id
			const src = value.file
            newList.push({
				category,
				src
			})
        });
		return {
			results : newList,
			offset : result.offset,
			count: result.count,
		}
	}
});
