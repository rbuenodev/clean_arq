import Product from "../../../domain/product/entity/product";
import ProductUpdateUseCase from "./update.product.usecase";

const product = new Product("123", "product", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product usecase", () => {
  it("Should update a product", async () => {
    const productRepository = MockRepository();
    const productUseCase = new ProductUpdateUseCase(productRepository);

    const input = {
      id: "123",
      name: "product2",
      price: 20,
    };

    const output = await productUseCase.execute(input);
    expect(output).toEqual(input);
  });
});
