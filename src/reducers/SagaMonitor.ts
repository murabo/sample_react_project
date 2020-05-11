import ActionType from '../actions/SagaMonitor/ActionType';
import Action from '../actions/SagaMonitor/Action';
import createReducer from "./createReducer";

export const sagaMonitor = createReducer<[]>([], {
	[ActionType.SET_EFFECT](state: [], action: Action) {
		let effectId = action.payload
		let newList:any = state
		newList.push({effectId: effectId})
		return newList
	},
	[ActionType.DELETE_EFFECT](state: {effectId}[], action: Action) {
		let effectId = action.payload
		let newList = state.filter(n => n.effectId !== effectId);
		return newList
	}
});
