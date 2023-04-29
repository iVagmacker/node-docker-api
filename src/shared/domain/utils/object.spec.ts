import { deepFreeze } from "./object";

describe('Object Unit Tests', () => {
    it('should not freeze a scalar value', () => {
        const str = deepFreeze('a');
        expect(typeof str).toBe('string');

        const boolean = deepFreeze(true);
        expect(typeof boolean).toBe("boolean");
    })
    it('should be a immutable object', () => {
        const obj = deepFreeze({ prop1: 'value1', deep: { prop2: 'value2', prop3: new Date() } });

        expect(() => {
            (obj as any).prop1 = "test";
        }).toThrow("Cannot assign to read only property 'prop1' of object");

        expect(() => {
            (obj as any).deep.prop2 = "test";
        }).toThrow("Cannot assign to read only property 'prop2' of object");

        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
});