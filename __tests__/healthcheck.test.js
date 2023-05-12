import request from "supertest";
import app from "../src/app.js";

describe("Healthcheck", () => {
  it("returns 200 if the server is running", async () => {
    const res = await request(app).get("/api/healthcheck");
    expect(res.status).toBe(200);
    expect(res.body.uptime).toBeGreaterThan(0);
    expect(res.body.message).toBe("OK");
  });
});
