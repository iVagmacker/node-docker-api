import { validateSync } from "class-validator";
import ValidatorFields, { FieldsError } from "./validator-fields-interface";

export default abstract class ClassValidator<PropsValidated> implements ValidatorFields<PropsValidated> {
    errors: FieldsError = null;
    validatedData: PropsValidated = null;
    validate(data: any): boolean {
        const errors = validateSync(data);
        if (errors.length) {
            this.errors = {};
            for (const error of errors) {
                const field = error.property;
                this.errors[field] = Object.values(error.constraints);
            }
        } else {
            this.validatedData = data;
        }
        return !errors.length;
    }

}