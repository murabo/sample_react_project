import ActionType from './ActionType';
import { createAsyncAction } from 'typesafe-actions';

export const setEffect = createAsyncAction(
	ActionType.SET_EFFECT,
	'',
	'',
)<any, any, void>();

export const deleteEffect = createAsyncAction(
	ActionType.DELETE_EFFECT,
	'',
	'',
)<any, any, void>();
