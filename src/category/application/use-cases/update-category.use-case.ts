import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import UseCase from "../../../shared/application/use-case";

export default class UpdateCategoryUseCase implements UseCase<Input, CategoryOutput> {

    constructor(private categoryRepository: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<CategoryOutput> {
        const entity = await this.categoryRepository.findById(input.id);
        entity.update(input.name, input.description);

        if (input.isActive === true) {
            entity.activate();
        } else if (input.isActive === false) {
            entity.deactivate();
        }
        await this.categoryRepository.update(entity);
        return CategoryOutputMapper.toOutput(entity);
    }
}

export type Input = {
    id: string;
    name: string;
    description?: string;
    isActive?: boolean;
};