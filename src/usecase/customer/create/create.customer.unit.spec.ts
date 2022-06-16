import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "rich",
  address: {
    street: "street",
    number: 123,
    zip: "zip",
    city: "city",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create customer usecase", () => {
  it("should create a customer", async () => {
    const customerRespository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(
      customerRespository
    );

    const output = await customerCreateUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRespository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(
      customerRespository
    );

    input.name = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when street is missing", async () => {
    const customerRespository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(
      customerRespository
    );

    input.address.street = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
