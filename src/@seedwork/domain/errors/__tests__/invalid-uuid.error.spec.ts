import InvalidUuidError from "../invalid-uuid.error";

describe("Invalid UUId error Unit Tests", () => {
  test("constructor without parameter message", () => {
    const error = new InvalidUuidError();

    expect(error.name).toBe("InvalidUuidError");
    expect(error.message).toBe("ID must be a valid UUID");
  });

  test("constructor with parameter message", () => {
    const error = new InvalidUuidError("Error happens here");

    expect(error.name).toBe("InvalidUuidError");
    expect(error.message).toBe("Error happens here");
  });
});
