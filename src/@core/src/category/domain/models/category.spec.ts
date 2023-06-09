import UniqueEntityId from "#shared/domain/value-objects/unique-entity-id";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "created_at");
    expect(Category.validate).toHaveBeenCalled();

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      isActive: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      isActive: false,
      created_at,
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

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
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

  test("getter of created_at field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });
});
