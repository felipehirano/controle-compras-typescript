import { deepFreeze } from "../object";

describe('Object Unit Tests', () => {
    it('should not freezze other types', () => {
        const str = deepFreeze('str');
        expect(typeof str).toBe('string');

        const num = deepFreeze(5);
        expect(typeof num).toBe('number');

        let bool = deepFreeze(true);
        expect(typeof bool).toBe('boolean');

        bool = deepFreeze(false);
        expect(typeof bool).toBe('boolean');

    });

    it('should be immutable object', () => {
        const obj = {
            prop1: 'prop1', 
            value1: 'value1', 
            nested: {
                prop2: 'prop2', 
                value2: 'value2'
            }
        }

        deepFreeze(obj);

        expect(() => obj.prop1 = 'teste1')
            .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

        expect(() => obj.nested.prop2 = 'teste2')
            .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    })
});