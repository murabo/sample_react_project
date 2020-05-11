import ActionType from './ActionType';
import { DialogModel } from '../../model/DialogModel';
import { createAsyncAction } from 'typesafe-actions';

export const setDialog = createAsyncAction(
	ActionType.SET_DIALOG,
	'',
	'',
)<DialogModel, void, void>();
