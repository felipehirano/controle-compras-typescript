import { FieldsErrors } from "../validators/validator-fields-interface";

export class ValidationError extends Error{}

export class EntityValidationError extends Error{
    constructor(public error: FieldsErrors){
        console.log(error);
        super('Entity Validation Error');
        this.name = 'EntityValidationError';
    }
}