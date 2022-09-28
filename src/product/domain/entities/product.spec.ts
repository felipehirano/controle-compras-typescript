import Product from "./product";

describe("Product Unit Tests", () => {
  // test("constructor of product with invalids props", () => {
  //   const product = new Product({
  //     description: "descricao",
  //     amount: 5,
  //     value: 4.7,
  //   });
  // });
  test("constructor of product with valid props", () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
    expect(product).toStrictEqual(
      new Product({
        description: "descricao",
        amount: 5,
        value: 4.7,
      })
    );
  });
});
