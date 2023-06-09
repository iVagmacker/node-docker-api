import { SearchParams as DefaultSearchParams, SearchResult as DefaultSearchResult, SearchableRepositoryInterface } from "../../../shared/domain/repository/repository-contracts";
import { Category } from "../models/category";

export namespace CategoryRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> { };

    export class SearchResult extends DefaultSearchResult<Category, Filter> { };

    export interface Repository extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> { }
}

export default CategoryRepository;