import ClassValidator from "../class-validator";
import * as libClassValidator from 'class-validator';
class StubClassValidator extends ClassValidator<{ field: string }> {

}

describe('ClassValidator Unit Tests', () => {
    const validator = new StubClassValidator();
    it('should initialize errors and validatedData variables with null', () => {
        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });

    it('shoud validate with errors', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([
            {
                property: 'field', constraints: { isRequired: 'some error' }
            }
        ]);
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({field: ["some error"]});
    });

    it('shoud validate without errors', () => {
        const validator = new StubClassValidator();
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([]);
        expect(validator.validate({ field: 'value' })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toStrictEqual({ field: "value" });
        expect(validator.errors).toBeNull();
    });
});