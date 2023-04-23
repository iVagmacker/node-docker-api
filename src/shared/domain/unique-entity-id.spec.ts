import InvalidUuidError from "../../shared/errors/invalid-uuid.error";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "./unique-entity-id";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("Unique entity ID Unit Tests", () => {
  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //   });

  const validateSpy = spyValidateMethod();
//   beforeEach(() => validateSpy.mockClear());
  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "e356ad9e-d315-43cd-a69c-81a3de3a8897";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
