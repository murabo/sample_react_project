import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type DialogAction = ActionType<typeof ActionCreators>;

export default DialogAction;
