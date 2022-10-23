import Product from "../../domain/entities/product";

export type ProductOutput = {
    id: string;
    description: string;
    amount: number;
    value: number;
}

export class ProductOutPutMapper {
    static toOutput(entity:Product): ProductOutput {
        return entity.toJSON();
    }
}