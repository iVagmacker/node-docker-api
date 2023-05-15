import { SortDirection } from "../../domain/repository/repository-contracts";

export type SearchInputDTO<Filter = string> = {
    page?: number;
    perPage?: number;
    sort?: string | null;
    sortDir?: SortDirection | null;
    filter?: Filter | null;
};