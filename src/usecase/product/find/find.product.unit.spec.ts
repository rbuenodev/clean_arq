import Product from "../../../domain/product/entity/product";
import ProductFindUseCase from "./find.product.usecase";

const product = new Product("123", "product", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test to find a product", () => {
  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const productUseCase = new ProductFindUseCase(productRepository);

    const input = { id: "123" };

    const result = await productUseCase.execute(input);
    const output = {
      id: "123",
      name: "product",
      price: 10,
    };

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new ProductFindUseCase(productRepository);

    const input = { id: "123" };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
