import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("123", "product 1", 10);
const product2 = new Product("456", "product 2", 20);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test for listing product use case", () => {
  it("Should list products", async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
