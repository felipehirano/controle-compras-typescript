import NotFoundError from "../../errors/not-found.error";
import Entity from "../../../domain/entity/entity";
import InMemoryRepository from "../in-memory-repository";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{}
class StubInMemoryRepository extends InMemoryRepository<StubEntity>{}

describe("InMemoryRepository Unit Tests", () => {
    let inMemoryRepository: StubInMemoryRepository;

    beforeEach(() => {
        inMemoryRepository = new StubInMemoryRepository();
    });
    it('should insert a new entity into memory', async () => {
        const entity = new StubEntity({name: 'Felipe', price: 5});
        await inMemoryRepository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(inMemoryRepository.items[0].toJSON());
    });

    it('should throws error when not findById in memory', async () => {
        /* 
            Rejects - Vem da promise, assim que ela termina, o erro é lancado
        */
        await expect(inMemoryRepository.findById('fake id')).rejects.toThrow(
            new NotFoundError(`Entity not found using ID fake id`)
        );

        await expect(inMemoryRepository.findById('929b0d1f-1393-4415-a614-1e163c11eef5')).rejects.toThrow(
            new NotFoundError(`Entity not found using ID 929b0d1f-1393-4415-a614-1e163c11eef5`)
        );
    });

    it('should findById entity in memory', async () => {
        const entity = new StubEntity({name: 'Felipe', price: 5});
        await inMemoryRepository.insert(entity);

        let entityFound = await inMemoryRepository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await inMemoryRepository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it('should findAll entities in memory', async () => {
        const entity = new StubEntity({name: 'Felipe', price: 5});
        await inMemoryRepository.insert(entity);

        const entities = await inMemoryRepository.findAll();
        expect(entities).toStrictEqual([entity]);
    });

    it('should throws error update when entity doesn`t exist in memory', async () => {
        const entity = new StubEntity({name: 'Felipe', price: 5});
        expect(inMemoryRepository.update(entity)).rejects.toThrow(
            new NotFoundError(`Entity not found using ID ${entity.id}`)
        );
    });

    it('should update entity in memory', async () => {
        const entity = new StubEntity({name: 'Felipe', price: 5});
        await inMemoryRepository.insert(entity);

        const entityUpdate = new StubEntity({name: 'Joao', price: 1}, entity.uniqueEntityId);
        await inMemoryRepository.update(entityUpdate);

        expect(entityUpdate.toJSON()).toStrictEqual(inMemoryRepository.items[0].toJSON());
    });

    it('should throws error delete when entity doesn`t exist in memory', async () => {
        /* 
            Rejects - Vem da promise, assim que ela termina, o erro é lancado
        */
        await expect(inMemoryRepository.delete('fake id')).rejects.toThrow(
            new NotFoundError(`Entity not found using ID fake id`)
        );

        await expect(inMemoryRepository.delete('929b0d1f-1393-4415-a614-1e163c11eef5')).rejects.toThrow(
            new NotFoundError(`Entity not found using ID 929b0d1f-1393-4415-a614-1e163c11eef5`)
        );
    });

    it('should delete entity in memory', async () => {
        const entity = new StubEntity({name: 'Felipe', price: 5});
        await inMemoryRepository.insert(entity);
        await inMemoryRepository.delete(entity.id);
        expect(inMemoryRepository.items).toHaveLength(0);

        await inMemoryRepository.insert(entity);
        await inMemoryRepository.delete(entity.uniqueEntityId);
        expect(inMemoryRepository.items).toHaveLength(0);
    });
});