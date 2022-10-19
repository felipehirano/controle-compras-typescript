import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { 
    RepositoryInterface, 
    SearchableRepositoryInterface, 
    SearchParams, 
    SearchResult, 
    SortDirection 
} from "./repository-contracts";

export abstract class InMemoryRepository
    <E extends Entity> implements RepositoryInterface<E> {

    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }
    async findById(id: string | UniqueEntityId): Promise<E> {
        /**
         * Como implementei no value object o método toString
         * é possível utilizar essa conversão para facilitar a manipulacao de algumas operacoes.
         */
        const _id = `${id}`;
        return this._get(_id);
    }
    async findAll(): Promise<E[]> {
        return this.items;
    }
    async update(entity: E): Promise<void> {
        await this._get(entity.id);
        const indexFound = this.items.findIndex(i => i.id === entity.id);
        this.items[indexFound] = entity;
    }
    async delete(id: string | UniqueEntityId): Promise<void> {
        const _id = `${id}`;
        await this._get(_id);

        const indexFound = this.items.findIndex(i => i.id === _id);
        this.items.splice(indexFound, 1);
    }

    protected async _get(id: string): Promise<E> {
        const item = this.items.find(i => i.id === id);
        if(!item) {
            throw new NotFoundError(`Entity not found using ID ${id}`);
        }

        return item;
    }
}

export abstract class InMemorySearchableRepository<E extends Entity> 
    extends InMemoryRepository<E>
    implements SearchableRepositoryInterface<E>{

    sortableFields: string[] = [];

    async search(props: SearchParams): Promise<SearchResult<E>> {

        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);

        return new SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter:props.filter
        })
    }

    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

    protected async applySort(
        items: E[], 
        sort: string | null, 
        sort_dir: SortDirection | null
    ): Promise<E[]> {
        if(!sort || !this.sortableFields.includes(sort)){
            return items;
        }

        return (
            /**
             * Necessário gerar um novo array com spread 
             * porque o sort sobrescreve o array que está sendo passado
             */

            /**
             * Como podemos ordenar passando o parâmetro de direcao, precisamos fazer uma validacao
             * sobre qual direcao queremos ordenar, por isso é necessário fazer essas condicoes.
             * a < b retorna -1, a >b retorna 1, se forem iguais retorna 0. 
             */
            
            [...items].sort((a, b) => {
                if(a.props[sort] < b.props[sort]) {
                    return sort_dir === "asc" ? -1 : 1;
                }

                if(a.props[sort] > b.props[sort]) {
                    return sort_dir === "asc" ? 1 : -1;
                }

                return 0;
            })
        )
        
    }

    protected async applyPaginate(
        items: E[], 
        page: SearchParams['page'], 
        per_page: SearchParams['per_page']
    ): Promise<E[]> {
        /**
         * page = 2, per_page = 15;
         * start = 1 * 15 = 15;
         * limit = 15 + 15 = 30;
         */
        const start = (page - 1) * per_page;
        const limit = start + per_page;

        return items.slice(start, limit);
    }
}