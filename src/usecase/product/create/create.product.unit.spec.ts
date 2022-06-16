import ProductCreateUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const input = {
  name: "Product",
  price: 10,
};

describe("Unit test create product usecase", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(productRepository);

    input.name = "";
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(productRepository);

    input.name = "Product";
    input.price = -1;
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
