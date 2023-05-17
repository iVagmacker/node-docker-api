import CategoryRepository from "../../domain/repository/category.repository";
import { Category } from "../../domain/models/category";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { default as DefaultUseCase } from "../../../shared/application/use-case";

export namespace CreateCategoryUseCase {

    export class UseCase implements DefaultUseCase<Input, CategoryOutput> {

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
}

export default CreateCategoryUseCase;
