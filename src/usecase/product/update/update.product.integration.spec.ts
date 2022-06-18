import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductUpdateUseCase from "./update.product.usecase";

describe("Integration test update product usecase", () => {
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

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "product", 10);
    await productRepository.create(product);

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
