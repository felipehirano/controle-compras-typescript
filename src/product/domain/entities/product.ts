import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type ProductProps = {
  description?: string;
  amount?: number;
  value?: number;
};
export default class Product extends Entity<ProductProps> {

  constructor(public readonly props: ProductProps, id?: UniqueEntityId) {
    super(props, id)
  }

  update(props: ProductProps) {
    this.description = props.description;
    this.amount = props.amount;
    this.value = props.value;
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