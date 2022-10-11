import Product from "./product";
import { omit } from "lodash";
describe("Product Unit Tests", () => {
  test("constructor of product with valid props", () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
    const props = omit(product.props, "id");
    expect(props).toStrictEqual({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
  });

  test("getters and setters of description product prop", () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
    expect(product.description).toBe("descricao");

    product["description"] = "alterou description";
    expect(product.description).toBe("alterou description");
  });

  test("getters and setters of amount product prop", () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
    expect(product.amount).toBe(5);

    product["amount"] = 10;
    expect(product.amount).toBe(10);
  });

  test("getters and setters of value product prop", () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
    expect(product.value).toBe(4.7);

    product["value"] = 10.2;
    expect(product.value).toBe(10.2);
  });

  test("getters and setters of products props", () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });

    expect(product.value).toBe(4.7);

    product["value"] = 10.2;
    expect(product.value).toBe(10.2);
  });

  test('update a product', () => {
    const product = new Product({
      description: "descricao",
      amount: 5,
      value: 4.7,
    });
   
    const updated = {
      description: "teste",
      amount: 4,
      value: 7.7,
    };

    product.update(updated)

    expect(product.description).toBe(updated.description);
    expect(product.amount).toBe(updated.amount);
    expect(product.value).toBe(updated.value);
  });
});
