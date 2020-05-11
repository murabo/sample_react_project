import ActionType from './ActionType';
import { CompanyModel, LogoImageRequestModel } from '../../model/CompanyModel';
import { createAsyncAction } from 'typesafe-actions';

export const getCompany = createAsyncAction(
	ActionType.GET_COMPANY_REQUEST,
	ActionType.GET_COMPANY_SUCCEEDED,
	ActionType.GET_COMPANY_FAILED,
)<void, CompanyModel, Error>();

export const postCompany = createAsyncAction(
	ActionType.POST_COMPANY_REQUEST,
	ActionType.POST_COMPANY_SUCCEEDED,
	ActionType.POST_COMPANY_FAILED,
)<CompanyModel, void, Error>();

export const patchCompany = createAsyncAction(
	ActionType.PATCH_COMPANY_REQUEST,
	ActionType.PATCH_COMPANY_SUCCEEDED,
	ActionType.PATCH_COMPANY_FAILED,
)<CompanyModel, void, Error>();

export const patchLogo = createAsyncAction(
	ActionType.PATCH_LOGO_REQUEST,
	ActionType.PATCH_LOGO_SUCCEEDED,
	ActionType.PATCH_LOGO_FAILED,
)<LogoImageRequestModel, void, Error>();
