import ActionType from './ActionType';
import { DashboardModel, DashboardRequestModel } from '../../model/DashboardModel';
import { createAsyncAction } from 'typesafe-actions';

export const getDashboard = createAsyncAction(
	ActionType.GET_ASSET_REQUEST,
	ActionType.GET_ASSET_SUCCEEDED,
	ActionType.GET_ASSET_FAILED,
)<DashboardRequestModel, DashboardModel, Error>();
