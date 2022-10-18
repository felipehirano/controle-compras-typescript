import Product from "../../../product/domain/entities/product";
import {InMemorySearchableRepository} from "../../../@seedwork/domain/repository/in-memory-repository";
import { ProductRepository } from "../../../product/domain/repository/product-repository";

export default class ProductInMemoryRepository 
    extends InMemorySearchableRepository<Product> 
    implements ProductRepository{}