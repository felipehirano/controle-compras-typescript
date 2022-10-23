import Product from "../../../domain/entities/product";
import { ProductOutPutMapper } from "../product-output";

describe('ProductOutput Unit Tests', () => {
    it('should receive a entity and returns his entity', () => {
        const entity = new Product({description: 'desc', amount: 5, value: 10});
        expect(ProductOutPutMapper.toOutput(entity)).toStrictEqual(entity.toJSON());
    }) 
});