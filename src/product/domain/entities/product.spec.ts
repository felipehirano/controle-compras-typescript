import Product from "./product";

describe("Product Unit Tests", () => {
  test("constructor of product", () => {
    const product = new Product("Rice");

    expect(product.description).toBe("Rice");
  });
});
