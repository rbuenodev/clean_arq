import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "productTest",
      price: 20,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("productTest");
    expect(response.body.price).toBe(20);
  });

  it("Should list a product", async () => {
    const response = await request(app).post("/product").send({
      name: "product1",
      price: 20,
    });

    expect(response.status).toBe(200);
    const response2 = await request(app).post("/product").send({
      name: "product2",
      price: 40,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("product1");
    expect(product1.price).toBe(20);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("product2");
    expect(product2.price).toBe(40);
  });
});
