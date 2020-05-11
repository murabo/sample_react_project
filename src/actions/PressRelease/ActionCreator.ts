import ActionType from './ActionType';
import {
	PressReleaseModel,
	PressReleaseRequestModel,
	PressReleasePDFModel,
    PressReleasePostRequestModel,
	PressReleaseCommentModel,
	PressReleaseListModel,
	PressReleaseOneTimePasswordModel,
	PressReleaseCommentListModel,
	PressReleaseCommentFormModel,
	PressReleaseCloneModel,
	PressReleaseHistoryDetailModel,
	PressReleaseReviewResultModel,
	PressReleaseHistoryDetailRequestModel,
	PressReleaseRequestCreatorModel, PressReleaseListRequestModel,
	PressReleasePDFRequestModel
} from "../../model/PressReleaseModel";

import {
    ListRequestModel,
    ListModel
} from "../../model/ListModel";

import { createAsyncAction } from 'typesafe-actions';

export const getPressReleaseList = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_LIST_REQUEST,
	ActionType.GET_PRESS_RELEASE_LIST_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_LIST_FAILED
)<PressReleaseListRequestModel, PressReleaseListModel[], Error>();

export const getPressReleaseListPublic = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_LIST_PUBLIC_REQUEST,
	ActionType.GET_PRESS_RELEASE_LIST_PUBLIC_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_LIST_PUBLIC_FAILED
)<PressReleaseListRequestModel, PressReleaseListModel[], Error>();


export const getPressReleaseListArchive = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_LIST_ARCHIVE_REQUEST,
	ActionType.GET_PRESS_RELEASE_LIST_ARCHIVE_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_LIST_ARCHIVE_FAILED
)<PressReleaseListRequestModel, PressReleaseListModel[], Error>();

export const getPressReleaseDetails = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_DETAILS_REQUEST,
	ActionType.GET_PRESS_RELEASE_DETAILS_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_DETAILS_FAILED
)<PressReleaseRequestModel, PressReleaseModel, Error>();

export const postPressReleaseDetails = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_DETAILS_REQUEST,
	ActionType.POST_PRESS_RELEASE_DETAILS_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_DETAILS_FAILED
)<PressReleasePostRequestModel, PressReleaseRequestModel, Error>();

export const patchPressReleaseInfo = createAsyncAction(
	ActionType.PATCH_PRESS_RELEASE_INFO_REQUEST,
	ActionType.PATCH_PRESS_RELEASE_INFO_SUCCEEDED,
	ActionType.PATCH_PRESS_RELEASE_INFO_FAILED
)<PressReleasePostRequestModel, void, Error>();


export const postPressReleaseRevert = createAsyncAction(
    ActionType.POST_PRESS_RELEASE_REVERT_REQUEST,
    ActionType.POST_PRESS_RELEASE_REVERT_SUCCEEDED,
    ActionType.POST_PRESS_RELEASE_REVERT_FAILED,
)<void, void, void>();

export const patchPressReleaseArchive = createAsyncAction(
    ActionType.PATCH_PRESS_RELEASE_ARCHIVE_REQUEST,
    ActionType.PATCH_PRESS_RELEASE_ARCHIVE_SUCCEEDED,
    ActionType.PATCH_PRESS_RELEASE_ARCHIVE_FAILED,
)<PressReleaseRequestModel, void, void>();

export const deletePressReleaseDetails = createAsyncAction(
    ActionType.DELETE_PRESS_RELEASE_DETAILS_REQUEST,
    ActionType.DELETE_PRESS_RELEASE_DETAILS_SUCCEEDED,
    ActionType.DELETE_PRESS_RELEASE_DETAILS_FAILED
)<PressReleaseRequestModel, void, Error>();

export const getPressReleaseDiffHistoryDetails = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_DIFF_HISTORY_DETAILS_REQUEST,
	ActionType.GET_PRESS_RELEASE_DIFF_HISTORY_DETAILS_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_DIFF_HISTORY_DETAILS_FAILED
)<PressReleaseHistoryDetailRequestModel, void, Error>();

export const postPressReleaseClone = createAsyncAction(
    ActionType.POST_PRESS_RELEASE_CLONE_REQUEST,
    ActionType.POST_PRESS_RELEASE_CLONE_SUCCEEDED,
    ActionType.POST_PRESS_RELEASE_CLONE_FAILED
)<PressReleaseCloneModel, PressReleaseRequestModel, Error>();

export const getPressReleaseOneTimePassword = createAsyncAction(
    ActionType.GET_PRESS_RELEASE_ONETIME_PASSWORD_REQUEST,
    ActionType.GET_PRESS_RELEASE_ONETIME_PASSWORD_SUCCEEDED,
    ActionType.GET_PRESS_RELEASE_ONETIME_PASSWORD_FAILED
)<void, PressReleaseOneTimePasswordModel, Error>();

export const postPressReleasePDF = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_PDF_REQUEST,
	ActionType.POST_PRESS_RELEASE_PDF_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_PDF_FAILED
)<PressReleasePDFRequestModel, PressReleasePDFModel, Error>();


export const getPressReleaseHistory = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_HISTORY_LIST_REQUEST,
	ActionType.GET_PRESS_RELEASE_HISTORY_LIST_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_HISTORY_LIST_FAILED
)<void, PressReleaseModel[], Error>();

export const getPressReleaseHistoryDetails = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_REQUEST,
	ActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_FAILED
)<PressReleaseHistoryDetailRequestModel, PressReleaseModel[], Error>();

export const getPressReleaseHistoryDetailsLatest = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_LATEST_REQUEST,
	ActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_LATEST_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_HISTORY_DETAILS_LATEST_FAILED
)<PressReleaseHistoryDetailRequestModel, PressReleaseModel[], Error>();

export const getPressReleaseCommentList = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_COMMENT_LIST_REQUEST,
	ActionType.GET_PRESS_RELEASE_COMMENT_LIST_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_COMMENT_LIST_FAILED
)<void, PressReleaseCommentModel[], Error>();


export const getPressReleaseCommentDoneList = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_COMMENT_DONE_LIST_REQUEST,
	ActionType.GET_PRESS_RELEASE_COMMENT_DONE_LIST_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_COMMENT_DONE_LIST_FAILED
)<void, PressReleaseCommentModel[], Error>();


export const postPressReleaseComment = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_COMMENT_REQUEST,
	ActionType.POST_PRESS_RELEASE_COMMENT_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_COMMENT_FAILED
)<PressReleaseCommentListModel, void, Error>();


export const patchPressReleaseComment = createAsyncAction(
	ActionType.PATCH_PRESS_RELEASE_COMMENT_REQUEST,
	ActionType.PATCH_PRESS_RELEASE_COMMENT_SUCCEEDED,
	ActionType.PATCH_PRESS_RELEASE_COMMENT_FAILED
)<PressReleaseCommentListModel, string, Error>();

export const postPressReleaseReply = createAsyncAction(
    ActionType.POST_PRESS_RELEASE_REPLY_REQUEST,
    ActionType.POST_PRESS_RELEASE_REPLY_SUCCEEDED,
    ActionType.POST_PRESS_RELEASE_REPLY_FAILED
)<PressReleaseCommentListModel, void, Error>();


export const getPressReleaseTemplate = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_TEMPLATE_REQUEST,
	ActionType.GET_PRESS_RELEASE_TEMPLATE_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_TEMPLATE_FAILED
)<string, PressReleaseModel, Error>();

export const getPressReleaseTemplateList = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_TEMPLATE_LIST_REQUEST,
	ActionType.GET_PRESS_RELEASE_TEMPLATE_LIST_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_TEMPLATE_LIST_FAILED
)<void, PressReleaseListModel[], Error>();


// Review
export const getPressReleaseReviewList = createAsyncAction(
    ActionType.GET_PRESS_RELEASE_REVIEW_LIST_REQUEST,
    ActionType.GET_PRESS_RELEASE_REVIEW_LIST_SUCCEEDED,
    ActionType.GET_PRESS_RELEASE_REVIEW_LIST_FAILED
)<ListRequestModel, ListModel, Error>();

export const postPressReleaseReviewRequest = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_REVIEW_REQUEST_REQUEST,
	ActionType.POST_PRESS_RELEASE_REVIEW_REQUEST_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_REVIEW_REQUEST_FAILED
)<{}, void, Error>();

export const postPressReleaseReviewResult = createAsyncAction(
	ActionType.POST_PRESS_RELEASE_REVIEW_RESULT_REQUEST,
	ActionType.POST_PRESS_RELEASE_REVIEW_RESULT_SUCCEEDED,
	ActionType.POST_PRESS_RELEASE_REVIEW_RESULT_FAILED
)<PressReleaseReviewResultModel, void, Error>();


export const deletePressReleaseReviewRequest = createAsyncAction(
	ActionType.DELETE_PRESS_RELEASE_REVIEW_REQUEST,
	ActionType.DELETE_PRESS_RELEASE_REVIEW_REQUEST_SUCCEEDED,
	ActionType.DELETE_PRESS_RELEASE_REVIEW_REQUEST_FAILED
)<void, void, Error>();

export const getPressReleaseReviewInfo = createAsyncAction(
	ActionType.GET_PRESS_RELEASE_REVIEW_INFO_REQUEST,
	ActionType.GET_PRESS_RELEASE_REVIEW_INFO_SUCCEEDED,
	ActionType.GET_PRESS_RELEASE_REVIEW_INFO_FAILED
)<PressReleaseRequestModel, void, Error>();


export const postPressReleaseCreator = createAsyncAction(
    ActionType.POST_PRESS_RELEASE_CREATOR_REQUEST,
    ActionType.POST_PRESS_RELEASE_CREATOR_SUCCEEDED,
    ActionType.POST_PRESS_RELEASE_CREATOR_FAILED
)<PressReleaseRequestCreatorModel, void, Error>();


export const setPressReleaseDetails = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_DETAILS,
	'',
	'',
)<PressReleaseModel, void, void>();


export const setPressReleaseCreateDialog = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_CREATE_DIALOG,
	'',
	'',
)<boolean, void, void>();

export const setPressReleaseCommentForm = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_COMMENT_POSITION,
	'',
	'',
)<PressReleaseCommentFormModel, void, void>();


export const setPressReleaseTemplate = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_TEMPLATE,
	'',
	'',
)<PressReleaseModel, void, void>();

export const setPressReleaseCommentHover = createAsyncAction(
    ActionType.SET_PRESS_RELEASE_COMMENT_HOVER,
    '',
    '',
)<string, void, void>();


export const setPressReleaseCommentDone = createAsyncAction(
    ActionType.SET_PRESS_RELEASE_COMMENT_DONE,
    '',
    '',
)<void, void, void>();


export const setPressReleaseCommentSort = createAsyncAction(
    ActionType.SET_PRESS_RELEASE_COMMENT_SORT,
    '',
    '',
)<number[], void, void>();


export const setPressReleaseDetailsDiff = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_DETAILS_DIFF,
	'',
	'',
)<PressReleaseHistoryDetailModel, void, void>();


export const setPressReleaseName = createAsyncAction(
	ActionType.SET_PRESS_RELEASE_NAME,
	'',
	'',
)<string, void, void>();
