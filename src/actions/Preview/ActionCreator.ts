import ActionType from './ActionType';

import { createAsyncAction } from 'typesafe-actions';

export const setPreviewType = createAsyncAction(
	ActionType.SET_PREVIEW_TYPE,
	'',
	'',
)<string, void, void>();
