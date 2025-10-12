import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

test("Deve registrar um usuário com sucesso", async () => {
    const response = await request(app)
        .post("/api/user/user")
        .send({ email: "admin@test.com", password: "123" });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe("admin@test.com");
    expect(response.body.data).toHaveProperty("token");
});

test("Deve logar no usuário e retornar o token", async () => {
    const response = await request(app)
        .post("/api/user/login")
        .send({ email: "admin@test.com", password: "123" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("token");
});

