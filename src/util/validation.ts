import { Errors, Values } from "../model/FormModel";

export const required = (value: string): boolean => (value ? true : false);

const validate = (values: Values) => {
	const errors: Errors = {};
	if (!required(values.name)) {
		errors.name = '必須の項目です';
	}
	return errors;
};
