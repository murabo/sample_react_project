import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type InviteAction = ActionType<typeof ActionCreators>;

export default InviteAction;
