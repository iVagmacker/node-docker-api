export type FieldsError = {
    [field: string]: string[];
};

export default interface ValidatorFields<PropsValidated> {
    errors: FieldsError;
    validatedData: PropsValidated;
    validate(data: any): boolean;
}