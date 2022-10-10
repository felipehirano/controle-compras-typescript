import Entity from "../entity";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id.vo";

class StubEntity extends Entity<{ prop1: string, prop2: number}> {}

describe("Entity Unit Tests", () => {
    it('should construct a product object without id', () => {
        const entity = new StubEntity({prop1: 'prop1 value', prop2: 5});
        expect(entity.props).toStrictEqual({prop1: 'prop1 value', prop2: 5});
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
    });

    it('should construct a product object with id', () => {
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity({prop1: 'prop1 value', prop2: 5}, uniqueEntityId);

        expect(entity.props).toStrictEqual({prop1: 'prop1 value', prop2: 5});
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
        expect(entity.id).toBe(uniqueEntityId.value);
    });

    it('should convert a entity to a javascript object', () => {
        const arrange = {prop1: 'prop1 value', prop2: 5};
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);

        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange
        });
       
    });
});