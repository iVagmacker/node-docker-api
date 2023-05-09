import { Category } from "../../../category/domain/models/category";
import CategoryInMemoryRepository from "./category-in-memory.repository";

describe('CategoryInMemoryRepository', () => {
    let repository: CategoryInMemoryRepository;

    beforeEach(() => repository = new CategoryInMemoryRepository());

    it('shoud no filter items when filter object is null', async () => {
        const items = [new Category({ name: "test" })];
        const filterSpy = jest.spyOn(items, "filter");

        let itemsFiltered = await repository["applyFilter"](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });

    it('should filter items using filter parameter', async () => {
        const items = [
            new Category({ name: "test" }),
            new Category({ name: "TEST" }),
            new Category({ name: "fake" }),
        ];
        const filterSpy = jest.spyOn(items, "filter");
        let itemsFiltered = await repository["applyFilter"](items, "TEST");
        expect(filterSpy).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
});