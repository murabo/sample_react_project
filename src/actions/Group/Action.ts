import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type GroupAction = ActionType<typeof ActionCreators>;

export default GroupAction;
