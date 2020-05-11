import ActionType from './ActionType';
import { createAsyncAction } from 'typesafe-actions';

export const setMenu = createAsyncAction(
	ActionType.SET_MENU,
	'',
	''
)<void, null, null>();
