import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./AIActionCreator";

type PressReleaseAIAction = ActionType<typeof ActionCreators>;

export default PressReleaseAIAction;
