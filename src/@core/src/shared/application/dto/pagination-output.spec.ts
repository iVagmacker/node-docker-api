import { SearchResult } from "../../../shared/domain/repository/repository-contracts";
import { PaginationOutputMapper } from "./pagination-output";

describe('PaginationOutputMapper Unit Tests', () => {
    test('Output method', () => {
        const result = new SearchResult({
            items: ['fake'] as any,
            total: 1,
            current_page: 1,
            per_page: 1,
            sort: 'name',
            sortDir: 'desc',
            filter: 'fake'
        });

        const output = PaginationOutputMapper.toPaginationOutput(result);
        expect(output).toStrictEqual({
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 1
        });
    });
});