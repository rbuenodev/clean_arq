import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Rich",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345",
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Rich");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  it("Should no create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Rich",
    });
    expect(response.status).toBe(500);
  });

  it("Should list all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Rich",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345",
        },
      });

    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Sara",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345",
        },
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe("Rich");
    expect(customer.address.street).toBe("Street");
    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Sara");
    expect(customer2.address.street).toBe("Street");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
  });
});
