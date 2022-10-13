import ValidatorRules from "../../../@seedwork/domain/validators/validator-rules";
import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type ProductProps = {
  description: string;
  amount: number;
  value: number;
};
export default class Product extends Entity<ProductProps> {

  constructor(public readonly props: ProductProps, id?: UniqueEntityId) {
    Product.validate(props);
    super(props, id)
  }

  update(props: ProductProps) {
    Product.validate(props);
    this.description = props.description;
    this.amount = props.amount;
    this.value = props.value;
  }

  // Quando o método não utiliza nada da classe, passe ele para static.
  // Manobra para chamar o validate antes da chamada do super(); 
  static validate(props: ProductProps) {
    ValidatorRules.values(props.description, 'description').required().string();
    ValidatorRules.values(props.amount, 'amount').required().number();
    ValidatorRules.values(props.value, 'value').required().number();
  }

  get description(): string {
    return this.props.description;
  }

  private set description(desc: string) {
    this.props.description = desc;
  }

  get amount(): number {
    return this.props.amount;
  }

  private set amount(amount: number) {
    this.props.amount = amount;
  }

  get value(): number {
    return this.props.value;
  }

  private set value(value: number) {
    this.props.value = value;
  }
}