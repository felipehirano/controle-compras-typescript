import ValueObject from '../value-objects'

class StubValueObject extends ValueObject{}

describe('ValueObject Unit Tests', () => {
    it('should constructor a value object', () => {
        let valueObject = new StubValueObject('valueObject');
        expect(valueObject.value).toBe('valueObject');

        valueObject = new StubValueObject({valor: 1234, desc: 'desc'});
        expect(valueObject.value).toStrictEqual({valor: 1234, desc: 'desc'});
    });
});