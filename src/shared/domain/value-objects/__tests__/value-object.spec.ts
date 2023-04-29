import { deepFreeze } from "shared/domain/utils/object";
import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('string value');
        expect(vo.getValue()).toBe('string value');
        
        vo = new StubValueObject({prop1: 'value1'});
        expect(vo.getValue()).toStrictEqual({prop1: 'value1'});

    });

    it('should convert to a string', () => {
        const date = new Date();
        let arrange = [
            { received: "", expected: "" },
            { received: "fake test", expected: "fake test"},
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            { received: { prop1: "value1" }, expected: JSON.stringify({ prop1: "value1" }) },
        ];

        arrange.forEach(value => {
            const vo = new StubValueObject(value.received);
            expect(vo+"").toBe(value.expected);
        });
    });

    it('should be imutable', () => {
        const obj = { prop1: 'value1', deep: { prop2: 'value2', prop3: new Date() } };
        const vo = new StubValueObject(obj);

        expect(() => {
            obj.prop1 = "test";
        }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

        expect(() => {
            obj.deep.prop2 = "test";
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
});