import ProductInMemoryRepository from "../../../infra/repository/product-in-memory-repository";
import CreateProductUseCase from "../create-product-use-case";

describe('CreateProductUseCase Unit Tests', () => {
    let repository: ProductInMemoryRepository 
    let useCase: CreateProductUseCase;

    beforeEach(() => {
        repository = new ProductInMemoryRepository();
        useCase = new CreateProductUseCase(repository);
    });

    it('should create a product', async () => {
        const spyOnInsert = jest.spyOn(repository, 'insert');
        const output = await useCase.execute({description: 'desc', amount: 5, value: 10});
        expect(spyOnInsert).toHaveBeenCalled();
        expect(output).toStrictEqual({id: output.id, description: 'desc', amount: 5, value: 10});
    }) 
});