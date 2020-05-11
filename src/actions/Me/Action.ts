import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type MeAction = ActionType<typeof ActionCreators>;

export default MeAction;
