import request from "supertest";
import app from "../src/app.js";

describe("login", () => {
  it("returns 400 if parameters are missing", async () => {
    const res = await request(app).post("/api/auth/login");
    expect(res.status).toBe(400);
  });
});
