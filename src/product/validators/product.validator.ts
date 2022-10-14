import ClassValidatorFields from "../../@seedwork/domain/validators/class-validator-fields"
import { ProductProps } from "../domain/entities/product";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductRules {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    constructor(data: ProductProps) {
        Object.assign(this, data);
    }
}

export class ProductValidator extends ClassValidatorFields<ProductRules> {
    validate(data: ProductProps): boolean {
        return super.validate(new ProductRules(data));
    }
}

// Design pattern factory
export default class ProductValidatorFactory{
    static create() {
        return new ProductValidator();
    }
}