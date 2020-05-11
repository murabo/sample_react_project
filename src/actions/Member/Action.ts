import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type MemberAction = ActionType<typeof ActionCreators>;

export default MemberAction;
