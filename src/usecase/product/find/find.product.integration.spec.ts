import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFindUseCase from "./find.product.usecase";

describe("Integration test to find a product", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new ProductFindUseCase(productRepository);

    const product = new Product("123", "product", 10);
    await productRepository.create(product);

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
    const productRepository = new ProductRepository();
    const product = new Product("123", "product", 10);
    await productRepository.create(product);
    await productRepository.find("123");

    const usecase = new ProductFindUseCase(productRepository);
    const input = { id: "123" };
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
