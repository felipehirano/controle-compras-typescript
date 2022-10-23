import ProductRepository from "../../domain/repository/product-repository";
import UseCase from "../../../@seedwork/application/use-case";
import { ProductOutput, ProductOutPutMapper } from "../dto/product-output";


export default class GetProductUseCase implements UseCase<Input, Output>{
    constructor(private repository: ProductRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
        const entity = await this.repository.findById(input.id);
        return ProductOutPutMapper.toOutput(entity);
    }
}

export type Input = {
    id: string;
}

export type Output = ProductOutput