import request from "supertest";
import { app } from "../../src/app";

describe("GET /ping", () => {
  it("returns the application ping message", async () => {
    const response = await request(app).get("/ping");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "hello from Dylan S00254978",
    });
  });
});