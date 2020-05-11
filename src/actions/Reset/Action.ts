import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type ResetAction = ActionType<typeof ActionCreators>;

export default ResetAction;
