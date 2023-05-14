import request from "supertest";
import app from "../src/app.js";
import pool from "../src/configs/db.js";

describe("POST api/auth/register", () => {
  // clear the users table before each test
  beforeAll(async () => {
    await pool.query("DELETE FROM users");
  });

  // close the database connection after all tests are done
  afterAll(async () => {
    await pool.end();
  });

  it("returns 400 if invalid user inputs", async () => {
    await request(app).post("/api/auth/register").expect(400);
  });

  it("registers a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "12345678",
      })
      .expect(201);

    expect(res.body).toHaveProperty("user_id");
    expect(res.body.name).toEqual("John Doe");
    expect(res.body.email).toEqual("john@example.com");
  });

  it("returns 409 if user already exists", async () => {
    await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
      ["Jane Doe", "jane@example.com", "password123"]
    );

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "12345678",
      })
      .expect(409);

    expect(res.body.error).toEqual("User already exists");
  });
});
