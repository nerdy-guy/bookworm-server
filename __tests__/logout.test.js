import request from "supertest";
import app from "../src/app.js";

describe("logout", () => {
  it("returns 200", async () => {
    const res = await request(app).post("/api/auth/logout");
    expect(res.status).toBe(200);
  });
});
