import { Category } from "../../../../category/domain/models/category";
import NotFoundError from "../../../../shared/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.use-case";

describe('GetCategoryUseCase Unit Tests', () => {
    let useCase: GetCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase(repository);
    });

    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError(`Entity not found using ID fake id`));
    });

    it('should returns a category', async () => {
        const items = [
            new Category({ name: 'Movie' })
        ];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, 'findById');
        let output = await useCase.execute({ id: items[0].id });
        expect(output).toStrictEqual({
            id: items[0].id,
            name: 'Movie',
            description: null,
            isActive: true,
            created_at: items[0].created_at
        });
        expect(spyFindById).toHaveBeenCalledTimes(1);
    });
});