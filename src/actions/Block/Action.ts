import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type BlockAction = ActionType<typeof ActionCreators>;

export default BlockAction;
