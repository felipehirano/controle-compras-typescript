import { SearchResult } from "../../../domain/repository/repository-contracts";
import Product from "../../../../product/domain/entities/product";
import { PaginationOutputMapper } from "../pagination-output";

describe('PaginationOutput Unit Tests', () => {
    it('should receive a result and returns his results', () => {
        const result = new SearchResult({
            items: [new Product({description: 'desc', amount: 5, value: 10})],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null as any,
            sort_dir: 'asc',
            filter: null as any
        });

        expect(PaginationOutputMapper.toOutput(result)).toStrictEqual({
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
            sort: null as any,
            sort_dir: 'asc',
            filter: null as any
        })
    });
});