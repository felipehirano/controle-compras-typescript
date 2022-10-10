import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<EntityProps> {

    public readonly uniqueEntityId?: UniqueEntityId;

    constructor(public readonly props: EntityProps, id?: UniqueEntityId) {
        this.uniqueEntityId = id || new UniqueEntityId();
    }

    get id() {
        return this.uniqueEntityId.value;
    }

    toJSON() {
        return {
            id: this.id,
            ...this.props
        }
    }
}