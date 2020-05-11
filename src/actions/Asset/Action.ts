import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type AssetAction = ActionType<typeof ActionCreators>;

export default AssetAction;
