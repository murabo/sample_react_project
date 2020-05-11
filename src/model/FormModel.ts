export interface Values {
    [key: string]: string;
}

export interface Errors {
    [key: string]: string;
}

export interface FieldProps {
    input: any;
    label: string;
    type: string;
    helperText? :string,
    disabled? :boolean,
    options?: [];
    meta: {
        touched: string;
        error: string;
        warning: string;
    };
}


export interface FieldArrayProps {
    fields: [],
    meta: {
        touched: string;
        error: string;
        warning: string;
    };
}
