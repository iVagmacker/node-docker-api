import NotFoundError from "../../../../shared/domain/errors/not-found.error";
import { Category } from "../../../../category/domain/models/category";
import CategoryInMemoryRepository from "../../../../category/infra/repository/category-in-memory.repository";
import UpdateCategoryUseCase from "../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
    let useCase: UpdateCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase.UseCase(repository);
    });

    it("should throws error when entity not found", async () => {
        await expect(() =>
            useCase.execute({ id: "fake id", name: "fake" })
        ).rejects.toThrow(new NotFoundError(`Entity not found using ID fake id`));
    });

    it("should update a category", async () => {
        const spyUpdate = jest.spyOn(repository, "update");
        const entity = new Category({ name: "Movie" });
        repository.items = [entity];

        let output = await useCase.execute({ id: entity.id, name: "test" });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            description: null,
            isActive: true,
            created_at: entity.created_at,
        });

        type Arrange = {
            input: {
                id: string;
                name: string;
                description?: null | string;
                isActive?: boolean;
            };
            expected: {
                id: string;
                name: string;
                description: null | string;
                isActive: boolean;
                created_at: Date;
            };
        };
        const arrange: Arrange[] = [
            {
                input: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                    isActive: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    isActive: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    isActive: false,
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    isActive: false,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    isActive: false,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    isActive: true,
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    isActive: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                    isActive: false,
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                    isActive: false,
                    created_at: entity.created_at,
                },
            },
        ];

        for (const i of arrange) {
          output = await useCase.execute({
            id: i.input.id,
            name: i.input.name,
            description: i.input.description,
            isActive: i.input.isActive,
          });
          expect(output).toStrictEqual({
            id: entity.id,
            name: i.expected.name,
            description: i.expected.description,
            isActive: i.expected.isActive,
            created_at: i.expected.created_at,
          });
        }
    });
});