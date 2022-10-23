import ProductRepository from "../../domain/repository/product-repository";
import Product from "../../domain/entities/product";
import { ProductOutput, ProductOutPutMapper } from "../dto/product-output";
import UseCase from "../../../@seedwork/application/use-case";

export default class CreateProductUseCase implements UseCase<Input, Output>{

    constructor(private productRepository: ProductRepository.Repository){}

    async execute(input: Input): Promise<Output> {
        const product = new Product(input);
        await this.productRepository.insert(product);
        return ProductOutPutMapper.toOutput(product);
    }
}

export type Input = {
    description: string;
    amount: number;
    value: number;
}

export type Output = ProductOutput;