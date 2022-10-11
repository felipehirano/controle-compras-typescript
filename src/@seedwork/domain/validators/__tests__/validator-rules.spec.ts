import ValidatorRules from "../validator-rules";

describe("ValidatorRules Unit Tests", () => {
    it('should set the props of validator with value method', () => {
        const arrange = [
            {value: 5, field: 'Field number'},
            {value: 'testeee', field: 'Field string'},
            {value: {}, field: 'Field object'},
            {value: {prop: 1}, field: 'Field object'},
        ];

        arrange.forEach((item) => {
            const validatoRules = ValidatorRules.values(item.value, item.field);
            expect(validatoRules).toBeInstanceOf(ValidatorRules);
            expect(validatoRules['value']).toBe(item.value);
            expect(validatoRules['property']).toBe(item.field);
        });
    });
    it('should throw that the value is required', () => {
        const arrange = [
            {},
            {value: null, field: null},
            {value: null, field: 'Null Field'},
            {value: undefined, field: 'Undefined Field'},
            {value: '', field: 'Empty field'}
        ];

        arrange.forEach((item) => {
            expect(() => ValidatorRules.values(item.value, item.field).required())
            .toThrow(`The ${item.field} is required`)
        });
    });

    it('should throw that the value must be a string', () => {
        const date = new Date();
        const arrange = [
            {},
            {value: null, field: null},
            {value: null, field: 'Null Field'},
            {value: undefined, field: 'Undefined Field'},
            {value: 5, field: 'Number field'},
            {value: true, field: 'Boolean field'},
            {value: false, field: 'Boolean field'},
            {value: 0, field: 'Number field'},
            {value: {}, field: 'Number field'},
            {value: {prop: 1}, field: 'Number field'},
            {value: date, field: 'Date field'}
        ];

        arrange.forEach((item) => {
            expect(() => ValidatorRules.values(item.value, item.field).string())
                .toThrow(`The ${item.field} must be a string`)
        });
    });

    it('should throw that the value must has the maxLenght', () => {
        const arrange = [
            {value: 'testee', field: 'String field'},
            {value: 'testeee', field: 'String field'},
            {value: 'testeeeeeee', field: 'String field'},
        ];

        arrange.forEach((item) => {
            expect(() => ValidatorRules.values(item.value, item.field).maxLength(5))
                .toThrow(`The ${item.field} must be less or equal than 5 characters`)
        });
    });
});