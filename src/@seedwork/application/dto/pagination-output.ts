import Product from "../../../product/domain/entities/product";
import { SearchResult, SortDirection } from "../../domain/repository/repository-contracts";

export type PaginationOutput<E, Filter = string> = {
    items: E[];
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    sort: number;
    sort_dir: SortDirection;
    filter: Filter
}

export class PaginationOutputMapper {
    static toOutput(result: SearchResult<Product>) {
        return ({
            total: result.total,
            current_page: result.current_page,
            per_page: result.per_page,
            last_page: result.last_page,
            sort: result.sort,
            sort_dir: result.sort_dir,
            filter: result.filter
        })
    }
}