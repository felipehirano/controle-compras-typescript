import ValidationError from "../../../@seedwork/domain/errors/validation-error";
import Product from "./product";

describe('Product Integration Tests', () => {

    describe('create method', () => {
        it('should a invalid product when product is not passed', () => {
            expect(() => new Product({description: null, amount: null, value: null}))
                .toThrow(new ValidationError(`The description is required`))
            
            expect(() => new Product({description: 'desc', amount: null, value: null}))
                .toThrow(new ValidationError(`The amount is required`))
            
            expect(() => new Product({description: 'desc', amount: 5, value: null}))
                .toThrow(new ValidationError(`The value is required`))
        })
    
        it('should a invalid product when description is not string', () => {
            expect(() => new Product({description: 5 as any, amount: null, value: null}))
                .toThrow(new ValidationError(`The description must be a string`))
        })
    
        it('should a invalid product when amount is not a number', () => {
            expect(() => new Product({description: 'desc', amount: 'amount' as any, value: null}))
                .toThrow(new ValidationError(`The amount must be a number`))
        })
    
        it('should a invalid product when value is not a number', () => {
            expect(() => new Product({description: 'desc', amount: 5, value: 'value' as any}))
                .toThrow(new ValidationError(`The value must be a number`))
        })
    })

    describe('update method', () => {
        it('should a invalid product when product is not passed', () => {
            const product =  new Product({description: 'desc', amount: 5, value: 10});

            expect(() => product.update({description: null, amount: null, value: null}))
                .toThrow(new ValidationError(`The description is required`))
            
            expect(() => product.update({description: 'desc', amount: null, value: null}))
                .toThrow(new ValidationError(`The amount is required`))
            
            expect(() => product.update({description: 'desc', amount: 5, value: null}))
                .toThrow(new ValidationError(`The value is required`))
        })
    
        it('should a invalid product when description is not string', () => {
            const product =  new Product({description: 'desc', amount: 5, value: 10});

            expect(() =>product.update({description: 5 as any, amount: null, value: null}))
                .toThrow(new ValidationError(`The description must be a string`))
        })
    
        it('should a invalid product when amount is not a number', () => {
            const product =  new Product({description: 'desc', amount: 5, value: 10});

            expect(() =>product.update({description: 'desc', amount: 'amount' as any, value: null}))
                .toThrow(new ValidationError(`The amount must be a number`))
        })
    
        it('should a invalid product when value is not a number', () => {
            const product =  new Product({description: 'desc', amount: 5, value: 10});
            
            expect(() =>product.update({description: 'desc', amount: 5, value: 'value' as any}))
                .toThrow(new ValidationError(`The value must be a number`))
        })
    })
});