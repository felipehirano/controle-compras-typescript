import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import Product from "../../../domain/entities/product";
import ProductInMemoryRepository from "../../../infra/repository/product-in-memory-repository";
import GetProductUseCase from "../get-product-use-case";

describe('GetProductUseCase Unit Tests', () => {
    let repository: ProductInMemoryRepository 
    let useCase: GetProductUseCase;

    beforeEach(() => {
        repository = new ProductInMemoryRepository();
        useCase = new GetProductUseCase(repository);
    });

    it('should throws errors when entity product was not found', async () => {
        expect(useCase.execute({id: 'fake id'})).rejects
            .toThrow(new NotFoundError(`Entity not found using ID fake id`))
    });

    it('should get a entity product', async () => {

        const items = [new Product({description: 'desc', amount: 5, value: 10})];
        repository.items = items;

        const output = await useCase.execute({id: items[0].id});
        expect(output).toStrictEqual({
            id: items[0].id,
            description: 'desc',
            amount: 5,
            value: 10
        });
        
    }) 
});