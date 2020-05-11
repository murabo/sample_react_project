import BlockActionType from '../actions/Block/ActionType';
import BlockAction from '../actions/Block/Action';

import { BlockListModel } from "../model/BlockModel";
import createReducer from "./createReducer";


const initialStateBlocks: BlockListModel = {
	results : [],
	offset: 0,
	count: 0
};

export const block = createReducer<BlockListModel>(initialStateBlocks, {
	[BlockActionType.GET_BLOCK_SUCCEEDED](state: BlockListModel, action: BlockAction) {
		return action.payload
	}
});
