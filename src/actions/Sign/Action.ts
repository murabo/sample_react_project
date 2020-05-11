import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type SingAction = ActionType<typeof ActionCreators>;

export default SingAction;
