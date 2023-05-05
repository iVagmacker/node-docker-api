import { FieldsError } from "../shared/domain/validators/validator-fields-interface";

declare global {
    declare namespace jest{
        interface Matchers<R>{
            containsErrorMessages: (expected: FieldsError) => R
        }
    }
}

export {};