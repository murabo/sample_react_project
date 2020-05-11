import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type PreviewAction = ActionType<typeof ActionCreators>;

export default PreviewAction;
