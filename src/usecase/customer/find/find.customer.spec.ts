import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "john");
    const address = new Address("street", 123, "city", "zip");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const input = { id: "123" };

    const output = {
      id: "123",
      name: "john",
      address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip",
      },
    };

    const result = usecase.execute(input);
    expect(result).toEqual(output);
  });
});
