import ProductValidatorFactory, { ProductRules, ProductValidator } from "../product.validator";

describe("Product Unit Tests", () => {
    let productValidator: ProductValidator

    beforeEach(() => {
        productValidator = ProductValidatorFactory.create()
    })

    it('should invalidate cases for description field', () => {
        let isValid = productValidator.validate(null);
        expect(isValid).toBeFalsy();
        expect(productValidator.errors['description']).toStrictEqual(
            [ 
                'description should not be empty', 
                'description must be a string' 
            ]
        );

        isValid = productValidator.validate({description: true} as any);
        expect(isValid).toBeFalsy();
        expect(productValidator.errors['description']).toStrictEqual(
            [ 
                'description must be a string', 
            ]
        );

        isValid = productValidator.validate({description: ''} as any);
        expect(isValid).toBeFalsy();
        expect(productValidator.errors['description']).toStrictEqual(
            [ 
                'description should not be empty', 
            ]
        );
        
    });

    it('should validate cases for description field', () => {
        const isValid = productValidator.validate({description: 'desc', amount: 5, value: 10});
        expect(isValid).toBeTruthy();
        expect(productValidator.validatedData).toStrictEqual(new ProductRules({description: 'desc', amount: 5, value: 10}));
    });

    it('should invalidate cases for amount field', () => {
        const isValid = productValidator.validate(null);
        expect(isValid).toBeFalsy();
        expect(productValidator.errors['amount']).toStrictEqual(
            [ 
                'amount should not be empty',
                'amount must be a number conforming to the specified constraints'
            ]
        );
    });

    it('should validate cases for amount field', () => {
        const isValid = productValidator.validate({description: 'desc', amount: 5, value: 10});
        expect(isValid).toBeTruthy();
        expect(productValidator.validatedData).toStrictEqual(new ProductRules({description: 'desc', amount: 5, value: 10}));
    });

    it('should invalidate cases for value field', () => {
        const isValid = productValidator.validate(null);
        expect(isValid).toBeFalsy();
        expect(productValidator.errors['value']).toStrictEqual(
            [ 
                'value should not be empty',
                'value must be a number conforming to the specified constraints'
            ]
        );
    });

    it('should validate cases for value field', () => {
        const isValid = productValidator.validate({description: 'desc', amount: 5, value: 10});
        expect(isValid).toBeTruthy();
        expect(productValidator.validatedData).toStrictEqual(new ProductRules({description: 'desc', amount: 5, value: 10}));
    });
});
