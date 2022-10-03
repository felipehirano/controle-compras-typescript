import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";
import InvalidUuidError from "../../../../@seedwork/domain/errors/invalid-uuid.error";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("Unique Entity ID ValueObject Unit Tests", () => {
  const validateSpy = spyValidateMethod();

  it("should constructor of unique entity id value object with invalid id param", () => {
    expect(() => new UniqueEntityId("123456")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should constructor of unique entity id value object with params", () => {
    const uniqueEntityId = new UniqueEntityId(
      "0d09ec22-d5e7-491a-8772-1a9475f46fbd"
    );

    expect(uuidValidate(uniqueEntityId.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
  it("should constructor of unique entity id value object without params", () => {
    const uniqueEntityId = new UniqueEntityId();

    expect(uniqueEntityId.id).not.toBeNull();
    expect(uuidValidate(uniqueEntityId.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should validate params with invalid id param", () => {
    expect(() => new UniqueEntityId("123456")["validate"]).toThrow(
      new InvalidUuidError()
    );
  });

  it("should validate params with valid id param", () => {
    const uniqueEntityId = new UniqueEntityId(
      "0d09ec22-d5e7-491a-8772-1a9475f46fbd"
    );
    expect(() => uniqueEntityId["validate"]).toBeTruthy();
  });
});
