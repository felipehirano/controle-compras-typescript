import Product from "../../../domain/entities/product";
import ProductRepository from "../../../domain/repository/product-repository";
import ProductInMemoryRepository from "../../../infra/repository/product-in-memory-repository";
import ListProductsUseCase from "../list-products-use-case";

describe('ListProductUseCase Unit Tests', () => {
    let repository: ProductInMemoryRepository;
    let useCase: ListProductsUseCase;

    beforeEach(() => {
        repository = new ProductInMemoryRepository();
        useCase = new ListProductsUseCase(repository);
    });

    it('should returns output using empty input', async () => {
        const items = [
            new Product({description: 'desc1', amount: 10, value: 5}),
            new Product({description: 'desc2', amount: 30, value: 2}),
            new Product({description: 'desc3', amount: 40, value: 10}),
            new Product({description: 'desc4', amount: 50, value: 17}),
        ];

        repository.items = items;

        const output = await useCase.execute({});

        expect(output).toStrictEqual({
            items: [...items].reverse().map(item => item.toJSON()),
            total: 4,
            current_page: 1,
            per_page: 15,
            last_page: 1,
            sort: null,
            sort_dir: null,
            filter: null
        });

    })

    it('should returns output using pagination, sort and filter input', async () => {
        const items = [
            new Product({description: 'a', amount: 10, value: 5}),
            new Product({description: 'AAA', amount: 30, value: 2}),
            new Product({description: 'AaA', amount: 40, value: 10}),
            new Product({description: 'b', amount: 50, value: 17}),
            new Product({description: 'c', amount: 50, value: 17}),
        ];

        repository.items = items;

        let output = await useCase.execute({ page: 1, per_page: 2, sort: 'description', filter:'a'});
        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2,
            sort: 'description',
            sort_dir: 'asc',
            filter: 'a'
        });

        output = await useCase.execute({ page: 2, per_page: 2, sort: 'description', filter:'a'});
        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            current_page: 2,
            per_page: 2,
            last_page: 2,
            sort: 'description',
            sort_dir: 'asc',
            filter: 'a'
        });

        output = await useCase.execute({ page: 1, per_page: 2, sort: 'description', filter:'a', sort_dir: 'desc'});
        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2,
            sort: 'description',
            sort_dir: 'desc',
            filter: 'a'
        });

    })
});