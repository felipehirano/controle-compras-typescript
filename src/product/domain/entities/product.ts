import UniqueEntityId from "../../../@seedwork/domain/vo/unique-entity-id.vo";

export type ProductProps = {
  description: string;
  amount: number;
  value: number;
};
export default class Product {
  public readonly id?: UniqueEntityId;

  constructor(public readonly props: ProductProps, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
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
