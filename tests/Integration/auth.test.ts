import request from "supertest";
import { app } from "../../src/app";
import { UserModel } from "../../src/models/users";

describe("Authentication API", () => {
  const email = `auth-${Date.now()}@example.com`;
  const password = "worksheet-password";
  let userId = "";
  let token = "";

  afterAll(async () => {
    await UserModel.deleteOne({ email });
  });

  it("rejects invalid registration data", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ name: "Test", email: "not-an-email", password: "short" });

    expect(response.status).toBe(400);
  });

  it("registers a user without returning the password hash", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ name: "Test User", email: email.toUpperCase(), password });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: "Test User", email });
    expect(response.body).not.toHaveProperty("passwordHash");
    userId = response.body._id;

    const defaultQuery = await UserModel.findOne({ email }).lean();
    expect(defaultQuery).not.toHaveProperty("passwordHash");

    const hashQuery = await UserModel.findOne({ email }).select("+passwordHash").lean();
    expect(hashQuery?.passwordHash).toMatch(/^\$argon2id\$/);
    expect(hashQuery?.passwordHash).not.toBe(password);
  });

  it("rejects duplicate email addresses", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ name: "Duplicate", email, password });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  it("uses the same response for incorrect passwords and unknown users", async () => {
    const wrongPassword = await request(app)
      .post("/api/v1/auth/login")
      .send({ email, password: "wrong-password" });
    const unknownUser = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: `missing-${email}`, password });

    expect(wrongPassword.status).toBe(401);
    expect(unknownUser.status).toBe(401);
    expect(wrongPassword.body.message).toBe(unknownUser.body.message);
  });

  it("logs in and returns a JWT", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    token = response.body.token;
  });

  it("requires a bearer token for /me", async () => {
    const response = await request(app).get("/api/v1/auth/me");

    expect(response.status).toBe(401);
  });

  it("rejects an invalid bearer token", async () => {
    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
  });

  it("returns the authenticated user's public details", async () => {
    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ _id: userId, name: "Test User", email });
    expect(response.body).not.toHaveProperty("passwordHash");
  });
});