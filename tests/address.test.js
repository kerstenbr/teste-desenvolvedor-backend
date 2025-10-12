import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app.js";

let mongoServer;
let token;
let addressId;
let sharedAddressToken;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    const loginResponse = await request(app)
        .post("/api/user/user")
        .send({ email: "admin@test.com", password: "123" });

    token = loginResponse.body.data.token;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Testes de endereços", () => {
    test("Deve criar um novo endereço", async () => {
        const response = await request(app)
            .post("/api/addresses")
            .set("Authorization", `Bearer ${token}`)
            .send({
                address: "Rua Teste, 123"
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.createdAddress.address).toBe("Rua Teste, 123");

        addressId = response.body.data.createdAddress._id;
    });

    test("Deve achar o endereços que o usuário criou", async () => {
        const response = await request(app)
            .get("/api/addresses?address=Rua Teste, 123")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data.foundAddresses)).toBe(true);
    });

    test("Deve editar o endereço", async () => {
        const response = await request(app)
            .put(`/api/addresses/${addressId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                address: "Rua Teste EDITADA, 123"
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.editedAddress.address).toBe("Rua Teste EDITADA, 123");
    });

    test("Deve compartilhar o endereço", async () => {
        const response = await request(app)
            .post(`/api/addresses/${addressId}/share`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                expiresIn: "1h"
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.token).toBeDefined();
        sharedAddressToken = response.body.data.token;
    });

    test("Deve ver o endereço compartilhado", async () => {
        const response = await request(app)
            .get(`/api/addresses/shared/${sharedAddressToken}`)

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.address.address).toBe("Rua Teste EDITADA, 123");
    });

    test("Deve deletar o endereço", async () => {
        const response = await request(app)
            .delete(`/api/addresses/${addressId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    })
});
