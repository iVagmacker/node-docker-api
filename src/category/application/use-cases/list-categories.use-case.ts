import { PaginationOutputDTO, PaginationOutputMapper } from "../../../shared/application/dto/pagination-output";
import { SearchInputDTO } from "../../../shared/application/dto/search-input";
import UseCase from "../../../shared/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class ListCategoriesUseCase implements UseCase<SearchInputDTO, Output> {

    constructor(private categoryRepository: CategoryRepository.Repository) { }

    async execute(input: SearchInputDTO): Promise<Output> {
        const params = new CategoryRepository.SearchParams(input);
        const searchResult = await this.categoryRepository.search(params);
        return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
        return {
            items: searchResult.items.map((item) => CategoryOutputMapper.toOutput(item)),
            ...PaginationOutputMapper.toPaginationOutput(searchResult)
        }
    }
}

export type Output = PaginationOutputDTO<CategoryOutput>