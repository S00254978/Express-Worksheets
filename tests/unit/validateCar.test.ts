import { createCarZSchema } from "../../src/models/users";

const validCar = {
  make: "Una",
  model: "0871234567",
  year: 1980,
};

describe("Test Car Validation", () => {
  it("passes for valid data", () => {
    expect(() => createCarZSchema.parse(validCar)).not.toThrow();
  });

  it("passes when year is omitted", () => {
    expect(() =>
      createCarZSchema.parse({ ...validCar, year: undefined })
    ).not.toThrow();
  });

  it("fails for a year before 1950", () => {
    expect(() =>
      createCarZSchema.parse({ ...validCar, year: 1949 })
    ).toThrow();
  });

  it("fails for a non-numeric year", () => {
    expect(() =>
      createCarZSchema.parse({ ...validCar, year: "wrong year" })
    ).toThrow();
  });

  it("fails when make is missing", () => {
    expect(() =>
      createCarZSchema.parse({ ...validCar, make: undefined })
    ).toThrow();
  });

  it("fails when model is empty", () => {
    expect(() =>
      createCarZSchema.parse({ ...validCar, model: "" })
    ).toThrow();
  });
});