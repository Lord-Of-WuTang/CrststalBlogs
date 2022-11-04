const request = require("supertest");

const { connect } = require("./database");

const userModel = require("../models/user.model");

const app = require("../index");

describe("Auth: Signup", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should signup a user", async () => {
    const response = await request(app)
      .post("/signup")
      .set("content-type", "application/json")
      .send({
        username: "LordOfWuTang",
        password: "baskiot1234",
        firstName: "Abisoye",
        lastName: "Omolola",
        email: "lee@hmail.com",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("username", "LordOfWuTang");
    expect(response.body.user).toHaveProperty("firstname", "Abisoye");
    expect(response.body.user).toHaveProperty("lastname", "Omolola");
    expect(response.body.user).toHaveProperty("email", "lee@gmail.com");
  });

  it("should login a user", async () => {
    const user = await userModel.create({
      username: "LordOfWuTang",
      password: "baskiot1234",
    });

    const response = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        username: "LordOfWuTang",
        password: "baskiot1234",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
