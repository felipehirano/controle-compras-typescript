import Entity from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory-repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{};

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity>{
    sortableFields: string [] = ['name'];

    protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if(!filter) {
            return items;
        }
        return items.filter(item => {
            return (
                item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
                item.props.price.toString() === filter
            )
        });
    }
}

describe("InMemorySearchableRepository Unit Tests", () => {

    let inMemorySearchableRepository : StubInMemorySearchableRepository;

    beforeEach(() => 
        inMemorySearchableRepository = new StubInMemorySearchableRepository()
    );

    describe('applyFilter method', () => {
        it('should not filter items when filter param is null', async () => {
            const items = [new StubEntity({name: 'name value', price: 5})];
            const spyFilterMethod = jest.spyOn(items, 'filter');

            const itemsFiltereds = await inMemorySearchableRepository['applyFilter'](items, null);
            expect(itemsFiltereds).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });

        it('should filter items with params', async () => {
            const items = [
                new StubEntity({name: 'test', price: 5}),
                new StubEntity({name: 'TEST', price: 5}),
                new StubEntity({name: 'fake', price: 0})
            ];

            const spyFilterMethod = jest.spyOn(items, 'filter');

            let itemsFiltereds = await inMemorySearchableRepository['applyFilter'](items, 'TEST');
            expect(itemsFiltereds).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalled();

            itemsFiltereds = await inMemorySearchableRepository['applyFilter'](items, '5');
            expect(itemsFiltereds).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            itemsFiltereds = await inMemorySearchableRepository['applyFilter'](items, 'no-filter');
            expect(itemsFiltereds).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    });

    describe('applySort method', () => {
        it('should not sort items when filter param is null', async () => {
            const items = [
                new StubEntity({name: 'b', price: 5}),
                new StubEntity({name: 'a', price: 5}),
            ];

            let itemsSorted = await inMemorySearchableRepository['applySort'](items, null, null);
            expect(itemsSorted).toStrictEqual(items);

            itemsSorted = await inMemorySearchableRepository['applySort'](items, "price", "asc");
            expect(itemsSorted).toStrictEqual(items);
        });

        it('should sort items with params', async () => {
            const items = [
                new StubEntity({name: 'b', price: 5}),
                new StubEntity({name: 'a', price: 5}),
                new StubEntity({name: 'c', price: 5}),
            ];

            let itemsSorted = await inMemorySearchableRepository['applySort'](items, "name", "asc");

            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

            itemsSorted = await inMemorySearchableRepository['applySort'](items, "name", "desc");
            expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
        });
    });

    describe('applyPaginate method', () => {
        it('should paginate items', async () => {
            const items = [
                new StubEntity({name: 'a', price: 5}),
                new StubEntity({name: 'b', price: 5}),
                new StubEntity({name: 'c', price: 5}),
                new StubEntity({name: 'd', price: 5}),
                new StubEntity({name: 'e', price: 5}),
            ];

            let itemsPaginated = await inMemorySearchableRepository['applyPaginate'](items, 1, 2);

            expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

            itemsPaginated = await inMemorySearchableRepository['applyPaginate'](items, 2, 2);
            expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

            itemsPaginated = await inMemorySearchableRepository['applyPaginate'](items, 3, 2);
            expect(itemsPaginated).toStrictEqual([items[4]]);

            itemsPaginated = await inMemorySearchableRepository['applyPaginate'](items, 4, 2);
            expect(itemsPaginated).toStrictEqual([]);
        });
    });

    describe('search method', () => {
        it('should apply only paginate when other params are null', async () => {
            const entity = new StubEntity({name: 'a', price: 5});
            const items = Array(16).fill(entity);
            inMemorySearchableRepository.items = items;

            const result = await 
                inMemorySearchableRepository.search(new SearchParams());
            
            expect(result).toStrictEqual(new SearchResult({
                items: Array(15).fill(entity), // São 15 registros por página por default.
                total: 16,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null
            }));
        });

        it('should apply paginate and sort', async () => {            
            const items = [
                new StubEntity({name: 'b', price: 5}),
                new StubEntity({name: 'a', price: 5}),
                new StubEntity({name: 'd', price: 5}),
                new StubEntity({name: 'e', price: 5}),
                new StubEntity({name: 'c', price: 5}),
            ];
            inMemorySearchableRepository.items = items;

            const arrange = [
                {
                    params: new SearchParams({page: 1, per_page: 2, sort: 'name'}),
                    result: new SearchResult({
                        items: [items[1], items[0]],
                        total: 5,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: null
                    })
                },
                {
                    params: new SearchParams({page: 2, per_page: 2, sort: 'name'}),
                    result: new SearchResult({
                        items: [items[4], items[2]],
                        total: 5,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: null
                    })
                },
                {
                    params: new SearchParams({page: 1, per_page: 2, sort: 'name', sort_dir: 'desc'}),
                    result: new SearchResult({
                        items: [items[3], items[2]],
                        total: 5,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'desc',
                        filter: null
                    })
                },
                {
                    params: new SearchParams({page: 2, per_page: 2, sort: 'name', sort_dir: 'desc'}),
                    result: new SearchResult({
                        items: [items[4], items[0]],
                        total: 5,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'desc',
                        filter: null
                    })
                }
            ]

            for(const i of arrange) {
                let result = 
                    await inMemorySearchableRepository.search(new SearchParams(i.params));
                expect(result).toStrictEqual(i.result);
            }
        });

        it('should apply paginate and filter', async () => {            
            const items = [
                new StubEntity({name: 'test', price: 5}),
                new StubEntity({name: 'a', price: 5}),
                new StubEntity({name: 'TEST', price: 5}),
                new StubEntity({name: 'TeSt', price: 5}),
                new StubEntity({name: 'fake', price: 5}),
            ];
            inMemorySearchableRepository.items = items;

            let result = await 
                inMemorySearchableRepository.search(new SearchParams({
                    page: 1, per_page: 2, filter: 'TEST'
                }));
            
            expect(result).toStrictEqual(new SearchResult({
                items: [items[0], items[2]],
                total: 3,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: 'TEST'
            }));

            result = await 
                inMemorySearchableRepository.search(new SearchParams({
                    page: 2, per_page: 2, filter: 'TEST'
                }));
            
            expect(result).toStrictEqual(new SearchResult({
                items: [items[3]],
                total: 3,
                current_page: 2,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: 'TEST'
            }));
        });

        it('should apply paginate, filter and sort', async () => {
            const items = [
                new StubEntity({name: 'test', price: 5}),
                new StubEntity({name: 'a', price: 5}),
                new StubEntity({name: 'TEST', price: 5}),
                new StubEntity({name: 'e', price: 5}),
                new StubEntity({name: 'TeSt', price: 5}),
            ];
            inMemorySearchableRepository.items = items;

            const arrange = [
                {
                    params: new SearchParams({page: 1, per_page: 2, sort: 'name', filter: 'TEST'}),
                    result: new SearchResult({
                        items: [items[2], items[4]],
                        total: 3,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
                {
                    params: new SearchParams({page: 2, per_page: 2, sort: 'name', filter: 'TEST'}),
                    result: new SearchResult({
                        items: [items[0]],
                        total: 3,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
            ]

            for(const i of arrange) {
                let result = 
                    await inMemorySearchableRepository.search(new SearchParams(i.params));
                expect(result).toStrictEqual(i.result);
            }
        });
    });
});