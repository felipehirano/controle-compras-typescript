import Product from "../../../domain/entities/product";
import ProductInMemoryRepository from "../product-in-memory-repository";


describe('ProductInMemoryRepository', () => {

    let repository: ProductInMemoryRepository

    beforeEach(() => repository = new ProductInMemoryRepository());

    it('should no filter items when object is null', async () => {
        const items = [new Product({ description: 'desc', amount: 5, value: 10})]
        const filterSpy = jest.spyOn(items, "filter");

        let itemsFiltered = await repository["applyFilter"](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });

    it('should filter using filter params', async () => {
        const items = [
            new Product({ description: 'desc', amount: 5, value: 10}),
            new Product({ description: 'Desc', amount: 5, value: 10}),
            new Product({ description: 'fake', amount: 5, value: 10}),
        ];
        const filterSpy = jest.spyOn(items, "filter");

        let itemsFiltered = await repository["applyFilter"](items, "desc");
        expect(filterSpy).toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual([itemsFiltered[0], itemsFiltered[1]]);
    });

});