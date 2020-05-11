import ActionType from './ActionType';
import {
	PressKitModel,
	PressKitRequestModel,
	PressKitListModel,
	PressKitCloneModel,
	PressKitListRequestModel,
} from "../../model/PressKitModel";
import { ListModel } from '../../model/ListModel'
import { createAsyncAction } from 'typesafe-actions';

export const getPressKitList = createAsyncAction(
    ActionType.GET_PRESS_KIT_LIST_REQUEST,
    ActionType.GET_PRESS_KIT_LIST_SUCCEEDED,
    ActionType.GET_PRESS_KIT_LIST_FAILED
)<PressKitListRequestModel, ListModel, Error>();

export const getPressKitDetails = createAsyncAction(
	ActionType.GET_PRESS_KIT_DETAILS_REQUEST,
	ActionType.GET_PRESS_KIT_DETAILS_SUCCEEDED,
	ActionType.GET_PRESS_KIT_DETAILS_FAILED
)<PressKitRequestModel, PressKitModel, Error>();

export const postPressKitDetails = createAsyncAction(
	ActionType.POST_PRESS_KIT_DETAILS_REQUEST,
	ActionType.POST_PRESS_KIT_DETAILS_SUCCEEDED,
	ActionType.POST_PRESS_KIT_DETAILS_FAILED
)<void, PressKitRequestModel, Error>();


export const patchPressKitDetails = createAsyncAction(
	ActionType.PATCH_PRESS_KIT_DETAILS_REQUEST,
	ActionType.PATCH_PRESS_KIT_DETAILS_SUCCEEDED,
	ActionType.PATCH_PRESS_KIT_DETAILS_FAILED
)<PressKitRequestModel, PressKitModel, Error>();

export const deletePressKitDetails = createAsyncAction(
    ActionType.DELETE_PRESS_KIT_DETAILS_REQUEST,
    ActionType.DELETE_PRESS_KIT_DETAILS_SUCCEEDED,
    ActionType.DELETE_PRESS_KIT_DETAILS_FAILED
)<PressKitRequestModel, void, Error>();


export const postPressKitClone = createAsyncAction(
    ActionType.POST_PRESS_KIT_CLONE_REQUEST,
    ActionType.POST_PRESS_KIT_CLONE_SUCCEEDED,
    ActionType.POST_PRESS_KIT_CLONE_FAILED
)<PressKitCloneModel, PressKitRequestModel, Error>();

export const patchPressKitArchive = createAsyncAction(
	ActionType.PATCH_PRESS_KIT_ARCHIVE_REQUEST,
	ActionType.PATCH_PRESS_KIT_ARCHIVE_SUCCEEDED,
	ActionType.PATCH_PRESS_KIT_ARCHIVE_FAILED,
)<PressKitRequestModel, void, void>();


export const getPressKitTemplate = createAsyncAction(
	ActionType.GET_PRESS_KIT_TEMPLATE_REQUEST,
	ActionType.GET_PRESS_KIT_TEMPLATE_SUCCEEDED,
	ActionType.GET_PRESS_KIT_TEMPLATE_FAILED
)<string, PressKitModel, Error>();

export const getPressKitTemplateList = createAsyncAction(
	ActionType.GET_PRESS_KIT_TEMPLATE_LIST_REQUEST,
	ActionType.GET_PRESS_KIT_TEMPLATE_LIST_SUCCEEDED,
	ActionType.GET_PRESS_KIT_TEMPLATE_LIST_FAILED
)<void, PressKitListModel[], Error>();

export const patchPressKitName = createAsyncAction(
	ActionType.PATCH_PRESS_KIT_NAME_REQUEST,
	ActionType.PATCH_PRESS_KIT_NAME_SUCCEEDED,
	ActionType.PATCH_PRESS_KIT_NAME_FAILED,
)<void, PressKitListModel[], Error>();


export const setPressKitDetails = createAsyncAction(
	ActionType.SET_PRESS_KIT_DETAILS,
	'',
	'',
)<PressKitModel, void, void>();


export const setPressKitCreateDialog = createAsyncAction(
	ActionType.SET_PRESS_KIT_CREATE_DIALOG,
	'',
	'',
)<boolean, void, void>();

export const setPressKitTemplate = createAsyncAction(
	ActionType.SET_PRESS_KIT_TEMPLATE,
	'',
	'',
)<PressKitModel, void, void>();

export const setPressKitName = createAsyncAction(
	ActionType.SET_PRESS_KIT_NAME,
	'',
	'',
)<PressKitModel, void, void>();
