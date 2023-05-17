import { Category } from "../../../../category/domain/models/category";
import NotFoundError from "../../../../shared/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import DeleteCategoryUseCase from "../delete-category.use-case";

describe('DeleteCategoryUseCase Unit Tests', () => {
    let useCase: DeleteCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase(repository);
    });

    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError(`Entity not found using ID fake id`));
    });

    it('should delete a category', async () => {
        const items = [
            new Category({ name: 'Movie' })
        ];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, 'findById');
        await useCase.execute({ id: items[0].id });
        expect(repository.items).toHaveLength(0);
        expect(spyFindById).toHaveBeenCalledTimes(1);
    });
});