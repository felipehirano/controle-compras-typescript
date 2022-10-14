import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import ClassValidatorFields from "../class-validator-fields";

class StubRules {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules>{}

describe('Class Validator Fields Integration Tests', () => {

    it('should call validate method with error', () => {
        const classValidatorFields = new StubClassValidatorFields();
        
        expect(classValidatorFields.validate(new StubRules(null))).toBeFalsy();
        expect(classValidatorFields.errors).toStrictEqual(
            {
                name: [ 
                    'name should not be empty', 
                    'name must be a string' 
                ],
                price: [
                  'price should not be empty',
                  'price must be a number conforming to the specified constraints'
                ]
            }
        );
    });

    it('should call validate method without error', () => {
        const classValidatorFields = new StubClassValidatorFields();
        
        expect(classValidatorFields.validate(new StubRules({name: 'some name', price: 5}))).toBeTruthy();
        expect(classValidatorFields.validatedData).toStrictEqual(new StubRules({name: 'some name', price: 5}));
    });
});