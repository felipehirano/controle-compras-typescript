import ValueObject from '../value-objects'

class StubValueObject extends ValueObject{}

describe('ValueObject Unit Tests', () => {
    it('should constructor a value object', () => {
        let valueObject = new StubValueObject('valueObject');
        expect(valueObject.value).toBe('valueObject');

        valueObject = new StubValueObject({valor: 1234, desc: 'desc'});
        expect(valueObject.value).toStrictEqual({valor: 1234, desc: 'desc'});
    });

    it('should convert a value object to string', () => {
        const date = new Date();

        const arrange = [
            {received: 5, expect: '5'},
            {received: '', expect: ''},
            {received: true, expect: 'true'},
            {received: false, expect: 'false'},
            {received: date, expect: date.toString()},
            {
                received: { valor: 1234, desc: 'desc' }, 
                expect: JSON.stringify({ valor: 1234, desc: 'desc' })
            },
        ];

        arrange.forEach((item) => {
            const valueObject = new StubValueObject(item.received);
            expect(valueObject.toString()).toBe(item.expect);
        });
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
       
        const stub = new StubValueObject(obj);

        expect(() => (stub as any).value = 'testee')
            .toThrow("Cannot set property value of #<ValueObject> which has only a getter")

        expect(() => (stub as any).value.nested.value2 = 'testee')
            .toThrow("Cannot assign to read only property 'value2' of object '#<Object>")

    })
});