import CategoryRepository from "../../domain/repository/category.repository";
import { Category } from "../../domain/models/category";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import UseCase from "../../../shared/application/use-case";

export default class CreateCategoryUseCase implements UseCase<Input, CategoryOutput> {

    constructor(private categoryRepository: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<CategoryOutput> {
        const entity = new Category(input);
        await this.categoryRepository.insert(entity);
        return CategoryOutputMapper.toOutput(entity);
    }
}

export type Input = {
    name: string;
    description?: string;
    isActive?: boolean;
};