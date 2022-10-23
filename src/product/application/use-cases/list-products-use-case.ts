import UseCase from "../../../@seedwork/application/use-case";
import ProductRepository from "../../domain/repository/product-repository";
import { SearchInputDTO } from "../../../@seedwork/application/dto/search-input-dto";
import { PaginationOutputMapper } from "../../../@seedwork/application/dto/pagination-output";
import { ProductOutPutMapper } from "../dto/product-output";

export default class ListProductsUseCase implements UseCase<Input, Output>{
    constructor(private repository: ProductRepository.Repository) {}

    async execute(input: Input): Promise<Output>{
        const params = new ProductRepository.SearchParams(input);
        const result = await this.repository.search(params);

        const items = result.items.map(item => ({
            ...ProductOutPutMapper.toOutput(item)
        }));

        const pagination = PaginationOutputMapper.toOutput(result);

        return {
            items,
            ...pagination
        };
    }
}

export type Input = SearchInputDTO;

export type Output = PaginationOutputMapper;