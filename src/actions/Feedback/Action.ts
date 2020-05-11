import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type FeedbackAction = ActionType<typeof ActionCreators>;

export default FeedbackAction;
