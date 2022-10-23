import Product from "../../../product/domain/entities/product";
import {InMemorySearchableRepository} from "../../../@seedwork/domain/repository/in-memory-repository";
import ProductRepository  from "../../../product/domain/repository/product-repository";
import { SortDirection } from "../../../@seedwork/domain/repository/repository-contracts";

export default class ProductInMemoryRepository 
    extends InMemorySearchableRepository<Product> 
    implements ProductRepository.Repository{

    sortableFields: string[] = ["description"];
       
    protected async applyFilter(items: Product[], filter: ProductRepository.Filter): Promise<Product[]> {
        if(!filter) {
            return items;
        }
        return items.filter(item => {
            return item.props.description.toLowerCase().includes(filter.toLowerCase())
        });
    }

    protected async applySort(items: Product[], sort: string, sort_dir: SortDirection): Promise<Product[]> {
        return !sort
        ? super.applySort(items, "description", "desc")
        : super.applySort(items, sort, sort_dir)
    }
}