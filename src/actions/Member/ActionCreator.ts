import ActionType from './ActionType';
import { MemberModel, MemberRequestModel, MemberListRequestModel } from '../../model/MemberModel';
import { createAsyncAction } from 'typesafe-actions';

export const getMemberList = createAsyncAction(
	ActionType.GET_MEMBER_LIST_REQUEST,
	ActionType.GET_MEMBER_LIST_SUCCEEDED,
	ActionType.GET_MEMBER_LIST_FAILED,
)<MemberListRequestModel, MemberModel[], Error>();

export const postMember = createAsyncAction(
	ActionType.POST_MEMBER_REQUEST,
	ActionType.POST_MEMBER_SUCCEEDED,
	ActionType.POST_MEMBER_FAILED,
)<MemberRequestModel, void, Error>();

export const patchMember = createAsyncAction(
	ActionType.PATCH_MEMBER_REQUEST,
	ActionType.PATCH_MEMBER_SUCCEEDED,
	ActionType.PATCH_MEMBER_FAILED,
)<MemberModel, void, Error>();

export const deleteMember = createAsyncAction(
	ActionType.DELETE_MEMBER_REQUEST,
	ActionType.DELETE_MEMBER_SUCCEEDED,
	ActionType.DELETE_MEMBER_FAILED,
)<number, void, Error>();

export const getMemberSearch = createAsyncAction(
	ActionType.GET_MEMBER_SEARCH_REQUEST,
	ActionType.GET_MEMBER_SEARCH_SUCCEEDED,
	ActionType.GET_MEMBER_SEARCH_FAILED,
)<MemberRequestModel, void, Error>();

