import {ValidationError,EntityValidationError} from "../../../@seedwork/domain/errors/validation-error";
import Product from "./product";

describe('Product Integration Tests', () => {

    describe('create method', () => {
        it('should a invalid product when product is not passed', () => {
            expect(() => new Product({description: null, amount: null, value: null})).containsErrorMessages(
                {
                    description: [ 'description should not be empty', 'description must be a string' ],
                    amount: [
                      'amount should not be empty',
                      'amount must be a number conforming to the specified constraints'
                    ],
                    value: [
                      'value should not be empty',
                      'value must be a number conforming to the specified constraints'
                    ]
                }
            );
        })
    
        it('should a invalid product when description is not string', () => {
            expect(() => new Product({description: 5 as any, amount: null, value: null})).containsErrorMessages(
                {
                    amount: [
                        'amount should not be empty',
                        'amount must be a number conforming to the specified constraints'
                    ],
                    value: [
                        'value should not be empty',
                        'value must be a number conforming to the specified constraints'
                    ]
                }
            );
        })
    
        it('should a invalid product when amount is not a number', () => {
            expect(() => new Product({description: 'desc', amount: 'amount' as any, value: null})).containsErrorMessages(
                {
                    amount: [
                        'amount must be a number conforming to the specified constraints'
                    ],
                    value: [
                        'value should not be empty',
                        'value must be a number conforming to the specified constraints'
                    ]
                }
            );
        })
    
        it('should a invalid product when value is not a number', () => {
            expect(() => new Product({description: 'desc', amount: 5, value: 'value' as any})).containsErrorMessages(
                {
                    value: [
                        'value must be a number conforming to the specified constraints'
                    ]
                }
            );
        })
    })

    describe('update method', () => {
        it('should a invalid product when product is not passed', () => {
            const product =  new Product({description: 'desc', amount: 5, value: 10});

            expect(() => product.update({description: null, amount: null, value: null}))
                .containsErrorMessages(
                {
                    description: [ 'description should not be empty', 'description must be a string' ],
                    amount: [
                      'amount should not be empty',
                      'amount must be a number conforming to the specified constraints'
                    ],
                    value: [
                      'value should not be empty',
                      'value must be a number conforming to the specified constraints'
                    ]
                }
            );

            expect(() => product.update({description: 'desc', amount: null, value: null}))
                .containsErrorMessages(
                {
                    amount: [
                      'amount should not be empty',
                      'amount must be a number conforming to the specified constraints'
                    ],
                    value: [
                      'value should not be empty',
                      'value must be a number conforming to the specified constraints'
                    ]
                }
            );

            expect(() => product.update({description: 'desc', amount: 5, value: null}))
                .containsErrorMessages(
                {
                    value: [
                      'value should not be empty',
                      'value must be a number conforming to the specified constraints'
                    ]
                }
            );
        })
    })
});