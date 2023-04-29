import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "createdAt");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
    });

    expect(category.props.createdAt).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      isActive: false,
    });
    let createdAt = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      isActive: false,
      createdAt,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      isActive: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      isActive: true,
    });

    createdAt = new Date();
    category = new Category({
      name: "Movie",
      createdAt,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      createdAt,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId};
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of isActive field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie", isActive: true });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie", isActive: false });
    expect(category.isActive).toBeFalsy();
  });

  test("getter of createdAt field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.createdAt).toBeInstanceOf(Date);

    let createdAt = new Date();
    category = new Category({ name: "Movie", createdAt });
    expect(category.createdAt).toBe(createdAt);
  });
});
