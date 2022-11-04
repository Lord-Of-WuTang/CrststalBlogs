const request = require("supertest");

const { connect } = require("./database");

const app = require("../index");

const moment = require("moment");

const blogM = require("../models/blogModel");

const userM = require("../models/userModel");

describe("Blog Route", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect();

    await userModel.create({
      username: "lolaaltschool",
      password: "123412",
    });

    const loginResponse = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        username: "lolaaltschooler",
        password: "123412",
      });

    token = loginResponse.body.token;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should return blogs", async () => {
    // new blog in database
    await blogModel.create({
      state: 1,
      total_words: 900,
      created_at: moment().toDate(),
      items: [{ name: "author", words: 900, size: "m", quantity: 1 }],
    });

    await blogModel.create({
      state: 1,
      total_price: 900,
      created_at: moment().toDate(),
      items: [{ name: "author", words: 900, size: "m", quantity: 1 }],
    });

    const response = await request(app)
      .get("/orders")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("status", true);
  });

  it("should new post has been added", async () => {
    // new blog in database
    await OrderModel.create({
      state: 1,
      total_words: 900,
      created_at: moment().toDate(),
      items: [{ name: "author", words: 900, size: "m", quantity: 1 }],
    });

    await blogModel.create({
      state: 2,
      total_words: 900,
      created_at: moment().toDate(),
      items: [{ name: "author", words: 900, size: "m", quantity: 1 }],
    });

    const response = await request(app)
      .get("/orders?state=2")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("orders");
    expect(response.body).toHaveProperty("status", true);
    expect(response.body.orders.every((order) => order.state === 2)).toBe(true);
  });
});
