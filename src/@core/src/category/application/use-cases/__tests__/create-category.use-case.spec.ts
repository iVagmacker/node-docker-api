import CategoryInMemoryRepository from "../../../../category/infra/repository/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.use-case";

describe('CreateCategoryUseCase Unit Tests', () => {
    let useCase: CreateCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new CreateCategoryUseCase.UseCase(repository);
    });

    it('should create a category', async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
        let output = await useCase.execute({ name: 'test' });
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'test',
            description: null,
            isActive: true,
            created_at: repository.items[0].created_at
        });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        
        output = await useCase.execute({ name: 'test', description: 'some description', isActive: false });
        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: 'test',
            description: 'some description',
            isActive: false,
            created_at: repository.items[1].created_at
        });
        expect(spyInsert).toHaveBeenCalledTimes(2);
    });
});