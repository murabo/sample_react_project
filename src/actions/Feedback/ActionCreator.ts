import ActionType from './ActionType';
import { FeedbackModel } from '../../model/FeedbackModel';
import { createAsyncAction } from 'typesafe-actions';

export const postFeedback = createAsyncAction(
	ActionType.POST_FEEDBACK_REQUEST,
	ActionType.POST_FEEDBACK_SUCCEEDED,
	ActionType.POST_FEEDBACK_FAILED,
)<FeedbackModel, void, Error>();
