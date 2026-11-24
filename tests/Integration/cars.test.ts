import request from "supertest";
import { app } from "../../src/app";
import { CarModel } from "../../src/models/cars";

describe("Cars API", () => {
  let carId = "";
  const car = {
    make: "Una",
    model: `test-${Date.now()}`,
    year: 1980,
  };

  afterAll(async () => {
    if (carId) {
      await CarModel.findByIdAndDelete(carId);
    }
  });

  it("returns all cars", async () => {
    const response = await request(app).get("/api/v1/cars");

    expect(response.status).toBe(200);
  });

  it("requires an API key for write requests", async () => {
    const response = await request(app)
      .post("/api/v1/cars")
      .send(car);

    expect(response.status).toBe(401);
  });

  it("creates a car", async () => {
    const response = await request(app)
      .post("/api/v1/cars")
      .set("x-api-key", "test-key")
      .send(car);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(car);
    carId = response.body._id;
  });

  it("retrieves the created car", async () => {
    const response = await request(app).get(`/api/v1/cars/${carId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(car);
  });

  it("updates the created car", async () => {
    const response = await request(app)
      .put(`/api/v1/cars/${carId}`)
      .set("x-api-key", "test-key")
      .send({ model: `${car.model}-updated` });

    expect(response.status).toBe(200);
    expect(response.body.model).toBe(`${car.model}-updated`);
  });

  it("rejects an invalid car ID", async () => {
    const response = await request(app).get("/api/v1/cars/not-an-id");

    expect(response.status).toBe(400);
  });

  it("deletes the created car and returns 404 afterward", async () => {
    const deleted = await request(app)
      .delete(`/api/v1/cars/${carId}`)
      .set("x-api-key", "test-key");

    expect(deleted.status).toBe(200);

    const missing = await request(app).get(`/api/v1/cars/${carId}`);
    expect(missing.status).toBe(404);
  });
});