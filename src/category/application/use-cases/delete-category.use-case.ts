import UseCase from "../../../shared/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";

export default class DeleteCategoryUseCase implements UseCase<Input, void> {

    constructor(private categoryRepository: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<void> {
        const entity = await this.categoryRepository.findById(input.id);
        await this.categoryRepository.delete(entity.id);
    }
}

export type Input = {
    id: string;
};