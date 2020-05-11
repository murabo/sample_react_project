import { ActionType } from "typesafe-actions";
import * as ActionCreators from "./ActionCreator";

type CompanyAction = ActionType<typeof ActionCreators>;

export default CompanyAction;
