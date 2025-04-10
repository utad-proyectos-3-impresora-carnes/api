import request from "supertest";
import { server } from "../app";

export async function loginAsAdmin() {
    const response = await request(server)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "Admin123!" });

    return response.body.token;
}

export async function createTestMember(authToken: string) {
    const response = await request(server)
        .post("/api/member/")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
            fullName: "John Doe",
            dni: "12345678A",
            creationYear: 2024
        });

    return response.body._id;
}

export async function deleteTestMember(authToken: string, memberId: string) {
    await request(server)
        .delete(`/api/member/${memberId}`)
        .set("Authorization", `Bearer ${authToken}`);
}
