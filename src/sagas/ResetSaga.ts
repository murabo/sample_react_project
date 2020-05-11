import { takeLatest, put } from 'redux-saga/effects';
import AssetActionType from '../actions/Asset/ActionType';
import * as ActionCreators from '../actions/Asset/ActionCreator';

//
// function* getAsset(action: ReturnType<typeof ActionCreators.fetchAsset.request>) {
// 	yield put(ActionCreators.fetchAsset.success([{
// 		category: 'c1',
// 		src: 'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
// 	},{
// 		category: 'c1',
// 		src: 'http://placehold.it/350x250/78c5d6/fff/image2.jpg',
// 	}]));
// }
//
// function* postAsset(action: ReturnType<typeof ActionCreators.postAsset.request>) {
// 	// const data = yield call(() => fetchGet(url + action.payload));
// 	yield put(ActionCreators.postAsset.success({
// 		category: 'c1',
// 		src: 'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
// 	}));
// }

const assetSaga = [
	// takeLatest(AssetActionType.FETCH_ASSET_REQUEST, getAsset),
	// takeLatest(AssetActionType.POST_ASSET_REQUEST, postAsset),
	];

export default assetSaga;
