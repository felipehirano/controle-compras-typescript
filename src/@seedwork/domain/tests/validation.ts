// Custom Matcher, need to add this custom matcher in setupFilesAfterEnv that are in jest.cofig.ts. 
// Create a definition type called jest.d.ts(/src) to typescript recognize this matcher.

import { FieldsErrors } from "../validators/validator-fields-interface";
import ClassValidatorFields from "../validators/class-validator-fields";
import { EntityValidationError } from "../errors/validation-error";

type Expected = {validator: ClassValidatorFields<any>, data: any} | (() => any);

// expect({validator, data}).containErrorMessages;
// expect(() => {}).containErrorMessages;

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldsErrors) {
        if(typeof expected === "function") {
            try{
                expected();
                return isValid();
            }catch(e) {
                const error = e as EntityValidationError
                return assertContainsErrors(error.error, received);
            }
        }else {
            const {validator, data} = expected;
            const validated = validator.validate(data);
    
            if(validated){
                return isValid();
            }

            return assertContainsErrors(validator.errors, received);
        }
    }
});

function isValid() {
    // Retorno de um matcher segue essa estrutura
    return { pass: true, message: () => ""}
}

function assertContainsErrors(expected:FieldsErrors, received:FieldsErrors) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    
    return isMatch 
        ? isValid() 
        : {
            pass: false, 
            message: () => `The validation errors not contains ${JSON.stringify(
                received
            )}.Current: ${JSON.stringify(expected)}`,
        }
}