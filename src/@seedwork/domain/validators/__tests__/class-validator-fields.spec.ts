import ClassValidatorFields from '../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{field: string}>{}

describe('Class Validator Fields Unit Tests', () => {

    it('should set null when created', () => {
        const classValidatorFields = new StubClassValidatorFields();
        expect(classValidatorFields.errors).toBeNull();
        expect(classValidatorFields.validatedData).toBeNull();
    });

    it('should call validate method', () => {
        
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        spyValidateSync.mockReturnValue([
            {property: 'field', constraints: { isRequired: 'some Error'} }
        ])

        const classValidatorFields = new StubClassValidatorFields();
        expect(classValidatorFields.validate({})).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(classValidatorFields.validatedData).toBeNull();
        expect(classValidatorFields.errors).toStrictEqual({field: ["some Error"]});
    });

    it('should call validate method without errors', () => {
        
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        spyValidateSync.mockReturnValue([]);

        const classValidatorFields = new StubClassValidatorFields();
        expect(classValidatorFields.validate({field: 'value'})).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(classValidatorFields.validatedData).toStrictEqual({field: 'value'});
        expect(classValidatorFields.errors).toBeNull();
    });
});